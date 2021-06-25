/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



 module.exports = {

    //Display All Users
    show: async function (req, res) {
        try {
            let userResource = await User.find();
            if (userResource.error) {
                return res.badRequest(userResource.error);
            }
            res.status(200);
            return res.send({
                message: sails.__('user_shown'),
                data: userResource.data
            });
        } catch (error) {
            return res.serverError(error);
        }
    },

    // Create New User
    create: async function (req, res) {
        const { fullName, email, password } = req.allParams();
        try {
            let userResource = await User.create({ fullName, email, password });
            if (userResource.error) {
                return res.badRequest(userResource.error);
            }
            res.status(201);
            return res.send({
                message: sails.__('user_created'),
                data: userResource.data
            });
        } catch (error) {
            return res.serverError(error);
        }
    },


    // Update User
    // update: async function (req, res) {
    //     if(req.user.id !== req.param('id')){
    //         return res.forbidden({message:"vous n'avez pas le droit pour modifier"})
    //     }
    //     const { fullName, email, password } = req.allParams();
    //     try {
    //         let userResource = await User.updateOne(req.param('id'), {
    //             email,
    //             fullName,
    //             password
    //         });
    //         if (userResource.error) {
    //             return res.badRequest(userResource.error);
    //         }
    //         res.status(202);
    //         return res.send({
    //             message: sails.__('user_updated'),
    //             data: userResource.data
    //         });
    //     } catch (error) {
    //         return res.serverError(error);
    //     }
    // },

    // Delete User
    delete: async function (req, res) {
        if(req.user.id !== req.param('id')){
            return res.forbidden({message:"vous n'avez pas le droit pour supprimer"})
        }
        try {
            let userResource = await User.delete(req.param('id'));
            if (userResource.error) {
                return res.badRequest(userResource.error);
            }
            res.status(203);
            return res.send({
                message: sails.__('user_deleted')
            });
        } catch (error) {
            return res.serverError(error);
        }
    },

    // Signup User
    register: async function (req, res) {
        try {
            let { fullName, email, password } = req.allParams();
            const token = await sails.helpers.strings;
            let data = {
                fullName,
                email,
                password,
                emailProofToken: token,
                emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL
            }
            // Move this code bellow to the Service
            let newUser = await User.create(data).fetch();
            const confirmLink = `${sails.config.custom.baseUrl}/user/confirm?token=${token}`;
            // ...
            const sendMail = {
                to: newUser.email,
                subject: 'Confirm Your account',
                template: 'confirm',
                context: {
                    name: newUser.fullName,
                    confirmLink: confirmLink,
                }
            };
            // await sails.helpers.sendMail(sendMail);
            res.status(201);
            return res.send({message: sails.__(message.email) });
        } catch (error) {
            if (error.code === 'E_UNIQUE') {
                res.status(400);
                return res.send({ message: 'Email address already in use' });
            }
            return res.serverError(error);
        }
    },

    // Confirm User
    confirm: async function (req, res) {
        sails.log.info("query " + req.query.token);

        if (!req.query.token) {
            res.status(400);
            return res.send({
                message: "The provided token is expired, invalid, or already used up.",
            });
        }

        var user = await User.findOne({ emailProofToken: req.query.token });
        sails.log.info(user);
        if (!user || user.emailProofTokenExpiresAt <= Date.now()) {
            res.status(400);
            return res.send({
                message: "The provided token is expired, invalid, or already used up.",
            });
        }

        if (user.emailStatus === "unconfirmed") {
            await User.updateOne({ id: user.id }).set({
                emailStatus: "confirmed",
                emailProofToken: "",
                emailProofTokenExpiresAt: 0,
            });
            return res.ok({
                message: "Your account has been confirmed",
            });
        }
    },


    // Signin User
    login: async function (req, res) {
        const { email, password } = req.allParams();
        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                return res.forbidden({
                    message: `An account belonging to ${email} was not found`
                });
            }

            await sails.helpers.passwords
                .checkPassword(password, user.password)
                .intercept('incorrect', 'Password do not match');

            console.log(user.emailStatus);

            if (user.emailStatus !== 'confirmed') {
                res.status(401);
                return res.send({ message: `User ${email} is no longer active` })
            }

            const token = await sails.helpers.generateNewJwtToken(user.email);
            return res.send({
                message: `${user.email} has been logged in`,
                data: user,
                token,
            });
        } catch (error) {
            sails.log.error(error);
            if (error.isOperational) {
                res.status(400);
                return res.send({
                    message: `Error logging in user ${email}`,
                    error: error.raw,
                })
            }
            return res.forbidden({
                message: `Error logging in user ${email}`,
            });
        }

    },
    profil: async function (req, res) {
        sails.log.info(req.user);
        return res.ok(`Welcome ${req.user.fullName}, email : ${req.user.email} to the Training Sails BackEnd App`);
    }
};