const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');


const routes = express.Router();


// GET, POST, PUT, DELETE 
// requisão pro servidor, e o servidor dá uma resposta

// GET

// parâmetros que podem ser passados pela url
// req.query.name (http://localhost:3333/?name=Monika)

// GET
routes.get('/devs', DevController.index);

// POST
routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

// exportando
module.exports = routes;