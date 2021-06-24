/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    // Professeur
    'GET /professeur': 'ProfesseurController.list',
    'POST /professeur': 'ProfesseurController.create',
    "PATCH /professeur/:id": "ProfesseurController.update",
    "DELETE /professeur/:id": "ProfesseurController.delete",

    // Updated Professeur
    'GET /edit-professeur': 'UpdatedProfesseurController.list',
    "PATCH /edit-professeur/:id": "UpdatedProfesseurController.update",

    // User
    'GET /user': 'UserController.show',
    'POST /user': 'UserController.create',
    "POST /user/login": "UserController.login",
    "POST /user/register": "UserController.register",
};
