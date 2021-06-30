/**
 * CompetanceController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // POST Competance
    create: async function (req, res) {
        const { nom, description } = req.allParams();
        try {
            let comp = await Competance.create({ nom, description }).fetch();
            if (comp.error) {
                return res.send({
                    message: sails.__('Bad Request'),
                });
            }
            res.status(201);
            return res.send({
                message: sails.__('Competance Created Successfully'),
                data: comp
            });
        } catch (error) {
            return res.send({
                message: sails.__('Server Error'),
            })
        }
    },

    // GET Competances
    list: async function (req, res) {
        try {
            const comps = await Competance.find();
            return res.send(comps)
        } catch (error) {
            console.log(error)
            sails.log.warn(error);
            return { error };
        }
    },

    // DELETE Competance
    delete: async function (req, res) {
        const id = req.param('id')
        const comp = await Competance.findOne({ id: id })
        if (!comp) {
            return res.send({ message: sails.__("Competance Not Found") });
        }
        try {
            let compResource = await Competance.destroyOne({ id: id });
            if (compResource.error) {
                return res.badRequest(compResource.error);
            }
            res.status(203);
            return res.send({ message: sails.__('Competance Deleted Successfully') });
        } catch (error) {
            return res.serverError(error);
        }
    },
};

