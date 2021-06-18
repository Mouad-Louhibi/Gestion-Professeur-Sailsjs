/**
 * ProfesseurController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // POST Professeur
    create: async function (req, res) {
        const { nom, prenom, etat } = req.allParams();
        try {
            let prof = await Professeur.create({ nom, prenom, etat }).fetch();
            if (prof.error) {
                return res.badRequest(prof.error);
            }
            res.status(201);
            return res.send({
                message: sails.__('Professeur Created Successfully'),
                data: prof
            });
        } catch (error) {
            return res.serverError(error);
        }
    },
  
    // GET ProfesseurS
    list: async function (req, res) {
        try {
            const profs = await Professeur.find();
            return res.send(profs)
        } catch (error) {
            console.log(error)
            sails.log.warn(error);
            return { error };
        }
    },

    // PATCH Professeur
    update: async function(req, res) {
        const { nom, prenom, etat } = req.allParams();
        const id = req.param('id')
        try {
            let profObj = await Professeur.updateOne({ id: id }).set({ nom, prenom, etat });

            sails.log.info(profObj);
            if (profObj.error) {
                return res.badRequest(profObj.error);
            }
            res.status(201);
            return res.send({
                message: sails.__('Professeur Updated Successfully'),
                data: profObj.data
            });
        } catch (error) {
            res.status(500);
            return res.serverError(error);
        }
    },

    // DELETE Professeur
    delete: async function(req, res) {
        const id = req.param('id')
        const profObj = await Professeur.findOne({ id: id })
        if (!profObj) {
            return res.send({ message: sails.__("professeur Not Found") });
        }
        try {
            let profResource = await Professeur.destroyOne({ id: id });
            if (profResource.error) {
                return res.badRequest(profResource.error);
            }
            res.status(203);
            return res.send({ message: sails.__('Professeur Deleted Successfully') });
        } catch (error) {
            return res.serverError(error);
        }
    },
};

