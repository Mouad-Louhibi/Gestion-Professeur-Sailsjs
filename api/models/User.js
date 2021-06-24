/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
 module.exports = {

    attributes: {
      fullName: {
        type: 'string',
        required: true,
        columnName: 'full_name'
      },
      email: {
        type: 'string',
        required: true,
        unique: true,
      },
      emailStatus: {
        type: 'string',
        isIn: ['unconfirmed', 'confirmed'],
        defaultsTo: 'unconfirmed',
        columnName: 'email_status'
      },
      emailProofToken: {
        type: 'string',
        columnName: 'email_proof_token'
      },
      emailProofTokenExpiresAt: {
        type: 'number',
        columnName: 'email_proof_token_expires_at'
      },
      password: {
        type: 'string',
        required: true
      },
      passwordResetToken: {
        type: 'string',
        columnName: 'password_reset_token',
      },
      passwordResetTokenExpiresAt: {
        type: 'number',
        columnName: 'password_reset_token_expires_at',
      },  
    },
    customToJSON: function () {
      return _.omit(this, ["password"]);
    },
    // LIFE CYCLE
    // beforeCreate: async function (values, proceed) {
    //   // Hash password
    //   const hashedPassword = await sails.helpers.passwords.hashPassword( values.password );
    //   values.password = hashedPassword;
    //   return proceed();
    // }
  }
  