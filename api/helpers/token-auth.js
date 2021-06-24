var jwt = require('jsonwebtoken')

module.exports = {
    friendlyName: 'Verify JWT',
    description: 'Verify a JWT token.',
    inputs: {
        req: {
            type: 'ref',
            friendlyName: 'Request',
            required: true
        },
        res: {
            type: 'ref',
            friendlyName: 'Response',
            required: false
        }
    },
    exits: {
        invalid: {
            description: 'Invalid token or no authentication present.',
        }
    },
    fn: function (inputs, exits) {
        var req = inputs.req
        var res = inputs.res
        if (req.header('authorization')) {
            // if one exists, attempt to get the header data
            var token = req.header('authorization').split('Bearer ')[1]
            // if there's nothing after "Bearer", no go
            if (!token) return exits.invalid()
            // if there is something, attempt to parse it as a JWT token
            const secret = sails.config.custom.JWT_SECRET;

            return jwt.verify(token, secret, async function (err, payload) {
                sails.log(payload);
                if (err || !payload.sub) return exits.invalid()
                let user = await User.findOne({ email: payload.sub }).populate('teams');

                // const projectTest = user.teams;
                // const projectGet = [];
                // sails.log.info(user.teams)
                // let i = 0
                // for (project of projectTest) {
                //     projectGet[i++] = await Project.findOne({ id: project.projects })
                // }
                // user.projects = projectGet

                if (!user) return exits.invalid();
                // if it got this far, everything checks out, success
                req.user = user

                return exits.success(user)
            })
        }
        return exits.invalid()
    }
}