/**
 * ProjectController.js
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // POST Projects
    create: async function (req, res) {
        const { sujet, description, chef, prof } = req.allParams();
        try {
            let project = await Project.create({ sujet, description, chef, prof }).fetch();
            if (project.error) {
                return res.send({
                    message: sails.__('Bad Request'),
                });
            }
            res.status(201);
            return res.send({
                message: sails.__('Project Created Successfully'),
                data: project
            });
        } catch (error) {
            return res.send({
                message: sails.__('Server Error'),
            })
        }
    },

    // GET Projects
    list: async function (req, res) {
        try {
            const projects = await Project.find();
            return res.send(projects)
        } catch (error) {
            console.log(error)
            sails.log.warn(error);
            return { error };
        }
    },

    // PATCH Projects
    update: async function (req, res) {
        const { archive } = req.allParams();
        const id = req.param('id')
        try {
            let project = await Project.updateOne({ id: id }).set({ archive });

            sails.log.info(project);
            if (project.error) {
                return res.send({
                    message: sails.__('Bad Request'),
                });
            }
            res.status(201);
            return res.send({
                message: sails.__('Project Updated Successfully'),
                data: project.data
            });
        } catch (error) {
            return res.send({
                message: sails.__('Server Error'),
            })
        }
    },
};

