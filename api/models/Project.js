/**
 * Project.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        sujet: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        chef: {
            type: 'string'
        },
        prof: {
            type: 'string'
        },
        archive: {
            type: 'boolean'
        }
    },

};

