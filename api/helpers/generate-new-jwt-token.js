const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: "Generate new jwt token",

  description: "",

  inputs: {
    subject: {
      type: "string",
      required: true,
    },
    expiresIn:{
      type:"string",
      required:true
    }
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    const payload = {
      sub: inputs.subject, // subject
      iss: "GL_PORTAL_V2_AUTH", // issuer
    };
    const secret = sails.config.custom.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn:  inputs.expiresIn});
    return token;
  },
};
