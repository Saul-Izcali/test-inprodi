const { Router } = require('express');
const vuelosController = require('../controllers/vuelos.controller');

const router = Router();

router.get('/vuelos-cliente', (req, res) => {
    res.render('vuelos-cliente')
})

router.get('/vuelos-empleado', (req, res) => {
    res.render('vuelos-empleado')
})

router.get('/formulario-vuelos', (req, res) => {
    res.render('formulario-vuelo')
})

router.post('/crear-vuelo', vuelosController.crearVuelo)


export default router;
