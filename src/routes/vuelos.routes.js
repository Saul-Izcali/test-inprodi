const { Router } = require('express');
const vuelosController = require('../controllers/vuelos.controller');

const router = Router();

router.get('/ver-vuelos-cliente', vuelosController.vuelosCliente)
router.get('/ver-vuelos-empleado', vuelosController.vuelosEmpleado)

router.get('/vuelos-empleado', (req, res) => {
    res.render('vuelos-empleado')
})

router.get('/formulario-vuelos', (req, res) => {
    res.render('formulario-vuelo')
})

router.post('/crear-vuelo', vuelosController.crearVuelo)

router.get('/asistir-vuelo/:id', vuelosController.asistirVuelo)

router.get('/modificar-vuelo/:id', vuelosController.modificarVuelo)
// router.get('/ver-vuelos', vuelosController.verVuelos)


export default router;
