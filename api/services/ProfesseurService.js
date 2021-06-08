// /**
//  * ProfesseurService
//  *
//  * @description :: Server-side actions for handling incoming requests.
//  * @help        :: See https://sailsjs.com/docs/concepts/actions
//  */

//  module.exports = {

//     create: async function (profObj) {
//         try {
//             let prof = await Professeur.create(profObj).fetch();
//             if (prof.error) {
//                 return res.badRequest(prof.error);
//             }
//             res.status(201);
//             return res.send({
//                 message: sails.__('prof_created'),
//                 data: prof
//             });
//         } catch (error) {
//             return res.serverError(error);
//         }
//     },

//     list: async function () {
//         try {
//             const profs = await Professeur.find();
//             return { data: profs };
//         } catch (error) {
//             console.log(error)
//             sails.log.warn(error);
//             return { error };
//         }
//     },
// };

