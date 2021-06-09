/**
 * ProfesseurController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // getProfs:(req, res)=>{
    //     var profs = Professeur.find();
    //     res.send(profs);
    // }

    create: async function (req, res) {
        const { nom, prenom, etat } = req.allParams();
        try {
            let prof = await Professeur.create({ nom, prenom, etat }).fetch();
            if (prof.error) {
                return res.badRequest(prof.error);
            }
            res.status(201);
            return res.send({
                message: sails.__('Prof created successfully'),
                data: prof
            });
        } catch (error) {
            return res.serverError(error);
        }
    },
  
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
};

