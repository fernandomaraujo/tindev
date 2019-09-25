const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

    // listagem de vários registros dentro da tabela
    async index(req, res) {
        
        // buscando o usuário logado
        const { user } = req.headers;

        // dados do usuário logado
        const loggedDev = await Dev.findById(user);

        /*
            buscando usuários que NÂO são usuários logados
            buscando usuários que NÂO são usuários que o logado
            não deu like ou deslike
        */
        const users = await Dev.find({
            // aplicando os três filtros de uma vez só
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } }
            ]
        })

        return res.json(users);
    },

    async store(req, res) {

        const { username } = req.body;

        // checando se usuário já existe
        const userExists = await Dev.findOne({ user: username });

        // se encontrou usuário
        if(userExists) {
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar: avatar
         });

        return res.json(dev);
    }
};