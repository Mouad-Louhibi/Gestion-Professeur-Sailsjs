/**
 * UserController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // POST User
    create: async function (req, res) {
        const { nom, prenom, email, password } = req.allParams();
        try {
            let user = await User.create({ nom, prenom, email, password }).fetch();

            if (user.error) {
                return res.send({
                    message: sails.__('Bad Request'),
                });
            }

            const ruleUser = await Rule.find({ where: { nom: 'USER' } });
            await User.addToCollection(user.id, 'rules', ruleUser[0].id)

            res.status(201);
            return res.send({
                message: sails.__('User Created Successfully'),
                data: user
            });
        } catch (error) {
            return res.send({
                message: sails.__('Server Error'),
            })
        }
    },

    // LOGIN User
    login: async function (req, res) {
        const { email, password } = req.allParams();
        try {
            let user = await User.find({ where: { email: email } }).populate('rules');

            if (user.error) {
                return res.send({
                    message: sails.__('Bad Request'),
                });
            }

            if (user[0].password !== password) {
                return res.send({
                    message: sails.__('Password Incorrect'),
                })
            }

            let loginUser = await LoginUser.find()

            const id = loginUser.id
            const nom = user[0].nom
            const prenom = user[0].prenom
            const emailUser = user[0].email
            const etat = 'OnLine'
            const rules = user[0].rules[0].nom

            await LoginUser.update({ where: { id: id } }).set({ nom, prenom, email: emailUser, etat, rules });

            let loginUser2 = await LoginUser.find()

            res.status(201);
            return res.send({
                message: sails.__('User Logged In Successfully'),
                data: loginUser2
            });
        } catch (error) {
            return res.send({
                message: sails.__('Server Error'),
            })
        }
    },

    // LOGOUT User
    logout: async function (req, res) {
        try {
            const logoutUser = await LoginUser.find()

            console.log(logoutUser)

            if (logoutUser.error) {
                return res.send({
                    message: sails.__('Bad Request'),
                });
            }

            await LoginUser.update({ where: { id: logoutUser[0].id } }).set({ etat: 'OffLine' });

            let logout = await LoginUser.find()

            res.status(201);
            return res.send({
                message: sails.__('User Logged Out Successfully'),
                data: logout
            });
        } catch (error) {
            return res.send({
                message: sails.__('Server Error'),
            })
        }
    },

    // GET Currnet
    get: async function (req, res) {
        try {
            const currentUser = await LoginUser.find()

            if (currentUser.error) {
                return res.badRequest(currentUser.error)
            }

            return res.send(currentUser[0])
        } catch (error) {
            return res.serverError(error)
        }
    }
};

