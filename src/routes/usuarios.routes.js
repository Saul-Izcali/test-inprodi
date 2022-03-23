const { Router } = require('express');
const usuariosController = require('../controllers/usuarios.controller');

const router = Router();


router.get('/formulario-cliente', (req, res) => {
    res.render('crear-cliente')
})
router.get('/formulario-empleado', (req, res) => {
    res.render('crear-empleado')
})


router.post('/crear-cliente/', usuariosController.crearCliente);
router.post('/crear-empleado/', usuariosController.crearEmpleado);
router.post('/crear-admin/', usuariosController.crearAdmin);

router.post('/login', usuariosController.signin)

export default router;
