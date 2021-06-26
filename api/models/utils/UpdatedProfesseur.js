/**
 * UpdatedProfesseur.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    profId: {
      type:'string'
    },
    nom: {
      type:'string'
    },
    prenom:{
      type:'string'
    },
    etat:{
      type:'string'
    }
  },

};

