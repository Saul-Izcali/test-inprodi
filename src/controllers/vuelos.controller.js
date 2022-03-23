const usuariosController = {};

const vuelos = require('../model/Vuelos');


usuariosController.crearVuelo = async (req, res) => {
    const nuevoVuelo = new vuelos(req.body);

    console.log(nuevoVuelo)

    nuevoVuelo.capacidadActual = 0
    await nuevoVuelo.save();

    // res.status(200).json({'estado': 'ok'})
    res.redirect(req.get('referer'))
};




module.exports = usuariosController;
