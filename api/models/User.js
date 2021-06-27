/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {

    attributes: {
      nom: {
        type:'string'
      },
      prenom:{
        type:'string'
      },
      email:{
        type:'string'
      },
      password:{
        type:'string'
      },
      rules: {
        collection: 'rule',
        via: 'users'
      }
    },
  
  };
  
  