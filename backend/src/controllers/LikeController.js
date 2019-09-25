const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        console.log(req.io, req.connectedUsers);

        const { user } = req.headers;
        const { devId } = req.params;
        
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        // se estiver tentando dar like em um usuário que não existe
        if(!targetDev) {
            return res.status(400).json({ error: 'Dev not exists' });
        }

        // verificando se já tem like
        if(targetDev.likes.includes(loggedDev._id)) {
            // buscando pelo socket.id do usuário cadastrado
            const loggedSocket = req.connectedUsers[user];

            // buscando pelo usuário que recebeu o like
            const targetSocket = req.connectedUsers[devId];

            // se os envolvidos estiverem conectados na aplicação
            if(loggedSocket) {
                
                /*
                    seria interessante armazenar os matchs
                    no banco de dados
                    caso o usuário logue depois do match
                    ele poderá ser notificado
                    (não será implementado)
                */

                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if(targetSocket) {
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};