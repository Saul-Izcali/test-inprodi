const usuariosController = {};

const vuelosM = require('../model/Vuelos');


usuariosController.crearVuelo = async (req, res) => {
    const nuevoVuelo = new vuelosM(req.body);

    console.log(nuevoVuelo)

    nuevoVuelo.capacidadActual = 0
    await nuevoVuelo.save();

    // res.status(200).json({'estado': 'ok'})
    res.redirect('ver-vuelos-empleado')
};


usuariosController.vuelosCliente = async (req, res) => {
    const vuelos = await vuelosM.find().lean();
    console.log(vuelos)
    
    res.render("vuelos-cliente", {vuelos: vuelos})
};

usuariosController.vuelosEmpleado = async (req, res) => {
    const vuelos = await vuelosM.find().lean();
    console.log(vuelos)
    
    res.render("vuelos-empleado", {vuelos: vuelos})
};


usuariosController.asistirVuelo = async (req, res) => {
    const obtenerVuelo = await vuelosM.findById(req.params.id);
    
    obtenerVuelo.clientes = [{
        identificador: "id usr",
        nombre: "nombre usr",
        equipaje: "id equipaje"
    }]
    
    console.log(obtenerVuelo)

    await vuelosM.findByIdAndUpdate(req.params.id, obtenerVuelo);

    console.log("vuelo editado")

    const vuelos = await vuelosM.find().lean();
    
    res.render("vuelos-cliente", {vuelos: vuelos})
};

usuariosController.modificarVuelo = async (req, res) => {
    const obtenerVuelo = await vuelosM.findById(req.params.id).lean();
    
    console.log(obtenerVuelo)

    // await vuelosM.findByIdAndUpdate(req.params.id, obtenerVuelo);

    // console.log("vuelo editado")

    // const vuelos = await vuelosM.find().lean();
    
    res.render("detalles-vuelos", {vuelo: obtenerVuelo})
};





module.exports = usuariosController;
