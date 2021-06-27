// /**
//  * Seed Function
//  * (sails.config.bootstrap)
//  *
//  * A function that runs just before your Sails app gets lifted.
//  * > Need more flexibility?  You can also create a hook.
//  *
//  * For more information on seeding your app with fake data, check out:
//  * https://sailsjs.com/config/bootstrap
//  */

// module.exports.bootstrap = async function () {
//     // Create Update Prof
//     await UpdatedProfesseur.create({ nom: 'Mouad', prenom: 'Louhibi', etat: 'Interne' });

//     // Create Rules
//     await Rule.create({ nom: 'SUPER_USER' })
//     await Rule.create({ nom: 'USER' })

//     // Create Default User
//     await User.create({ nom: 'Oumama', prenom: 'Elhassouny', email: 'oumamaelhassouny@usmba.ac.ma', password: 'Oumama2021$' })

//     // Rules
//     const ruleSuperUser = await Rule.find({ where: { nom: 'SUPER_USER' } });
//     const defaultUser = await User.find({ where: { nom: 'Oumama' } });

//     // Add Rule To User
//     await User.addToCollection(defaultUser[0].id, 'rules', ruleSuperUser[0].id)
// };
