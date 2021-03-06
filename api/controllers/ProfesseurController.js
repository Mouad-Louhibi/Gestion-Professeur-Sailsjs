/**
 * ProfesseurController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // POST Professeur
    create: async function (req, res) {
        const { nom, prenom, etat, competance } = req.allParams();
        try {
            let prof = await Professeur.create({ nom, prenom, etat, competance }).fetch();
            if (prof.error) {
                return res.send({
                    message: sails.__('Bad Request'),
                });
            }
            res.status(201);
            return res.send({
                message: sails.__('Professeur Created Successfully'),
                data: prof
            });
        } catch (error) {
            return res.send({
                message: sails.__('Server Error'),
            })
        }
    },

    // GET Professeurs
    list: async function (req, res) {
        try {
            const profs = await Professeur.find();
            return res.send(profs)
        } catch (error) {
            return res.send({
                message: sails.__('Server Error'),
            })
        }
    },

    // PATCH Professeur
    update: async function (req, res) {
        const { nom, prenom, etat, competance } = req.allParams();
        const id = req.param('id')
        try {
            let profObj = await Professeur.updateOne({ id: id }).set({ nom, prenom, etat, competance });

            sails.log.info(profObj);
            if (profObj.error) {
                return res.send({
                    message: sails.__('Bad Request'),
                });
            }
            res.status(201);
            return res.send({
                message: sails.__('Professeur Updated Successfully'),
                data: profObj.data
            });
        } catch (error) {
            return res.send({
                message: sails.__('Server Error'),
            })
        }
    },

    // DELETE Professeur
    delete: async function (req, res) {
        const id = req.param('id')
        const profObj = await Professeur.findOne({ id: id })
        if (!profObj) {
            return res.send({
                message: sails.__("professeur Not Found")
            });
        }
        try {
            let profResource = await Professeur.destroyOne({ id: id });
            if (profResource.error) {
                return res.send({
                    message: sails.__('Bad Request'),
                });
            }
            res.status(203);
            return res.send({ message: sails.__('Professeur Deleted Successfully') });
        } catch (error) {
            return res.send({
                message: sails.__('Server Error'),
            })
        }
    },
};

