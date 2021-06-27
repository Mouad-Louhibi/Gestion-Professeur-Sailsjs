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
                return res.badRequest(user.error);
            }

            const ruleUser = await Rule.find({ where: { nom: 'USER' } });
            await User.addToCollection(user.id, 'rules', ruleUser[0].id)

            res.status(201);
            return res.send({
                message: sails.__('User Created Successfully'),
                data: user
            });
        } catch (error) {
            return res.serverError(error);
        }
    },

    // LOGIN User
    login: async function (req, res) {
        const { email, password } = req.allParams();
        try {
            let user = await User.find({ where: { email: email } });

            if (user.error) {
                return res.badRequest(user.error);
            }

            if (user[0].password !== password) {
                return res.send({
                    message: sails.__('Password Incorrect'),
                })
            }

            res.status(201);
            return res.send({
                message: sails.__('User Logged Successfully'),
                data: user
            });
        } catch (error) {
            return res.serverError(error);
        }
    },
};

