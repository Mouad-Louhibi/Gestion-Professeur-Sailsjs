/**
 * UpdatedProfesseurController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 module.exports = {
    // GET Professeur
    list: async function (req, res) {
        try {
            const profs = await UpdatedProfesseur.find();
            return res.send(profs)
        } catch (error) {
            console.log(error)
            sails.log.warn(error);
            return { error };
        }
    },

    // PATCH Professeur
    update: async function(req, res) {
        const { profId, nom, prenom, etat } = req.allParams();
        const id = req.param('id')
        try {
            let profObj = await UpdatedProfesseur.updateOne({ id: id }).set({ profId, nom, prenom, etat });

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
};

