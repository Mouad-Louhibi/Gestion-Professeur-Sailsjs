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
    'PATCH /professeur/:id': 'ProfesseurController.update',
    'DELETE /professeur/:id': 'ProfesseurController.delete',

    // Updated Professeur
    'GET /edit-professeur': 'UpdatedProfesseurController.list',
    'PATCH /edit-professeur/:id': 'UpdatedProfesseurController.update',

    // User
    'POST /user': 'UserController.create',
    'POST /user/login': 'UserController.login',
    'GET /user/logout': 'UserController.logout',
    'GET /user/current': 'UserController.get',

    // Project
    'POST /project': 'ProjectController.create',
    'GET /project': 'ProjectController.list',
    'PATCH /project/:id': 'ProjectController.update',

    // Competance
    'POST /competance': 'CompetanceController.create',
    'GET /competance': 'CompetanceController.list',
    'PATCH /competance/:id': 'CompetanceController.delete',
};
