const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejactionController = require('./controllers/RejactionController');

//Pegando o separador de rotas do express e colocando numa variavel
const routes = express.Router();
const upload = multer(uploadConfig);

/* Cria  uma rota dentro da restAPI passando uma função
    req = requizição -> pega os parametros do usuario
    res = resposta -> Devolve uma resposta para o cliente

    GET         -> Buscar informação do backend (Buscar uma lista de usuarios)
    POST       -> Criar uma nova informação no backend (Cadastro de usuario)
    PUT         -> Alterar uma informação no backend
    DELETE    -> Deletar uma informação no backend

    Rotas por padrão são em ingles e no plural

    req.query = acessar query params (para filtros)
    req.params = acessar route params (para edição, delete)
    req.body = acessar corpo da requisição (para criação, edição )
*/
routes.post('/sessions', SessionController.store);

routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashboardController.show);

//rota encadeada
routes.post('/spots/:spot_id/bookings', BookingController.store);

//rotas para aceitar e rejeitar as solicitações
routes.post ('/booking/:booking_id/approvals', ApprovalController.store)
routes.post ('/booking/:booking_id/rejections', RejactionController.store)

  module.exports = routes; 