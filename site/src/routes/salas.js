var express = require("express");
var router = express.Router();

var salaController = require('../controllers/salaController');

router.post('/', function (request, response) {
    salaController.cadastrar(request, response);
});

router.post('/getSala', function (request, response) {
    salaController.getSala(request, response);
});

router.post('/getqntdMaquinas', function (request, response) {
    salaController.getqntdMaquinas(request, response);
});

router.post('/getSalas', function (request, response) {
    salaController.getSalas(request, response);
});

router.post('/getMaquinasSala', function (request, response) {
    salaController.getMaquinasSala(request, response);
});

router.post('/getNomeSala', function (request, response) {
    salaController.getNomeSala(request, response);
});

module.exports = router;