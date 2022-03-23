const { Schema, model } = require('mongoose');


const usuarioAdminSchema = new Schema({
    admin: {type: Boolean, required: true}
});

const usuarioEmpleadoSchema = new Schema({
	nombre: {type: String, required: false},
	apellidoPaterno: {type: String, required: false},
	apellidoMaterno: {type: String, required: false},
	celular: {type: String, required: false},
	puesto: {type: String, required: false},
});

const usuarioClienteSchema = new Schema({
    nombre: {type: String, required: false},
	apellidoPaterno: {type: String, required: false},
	apellidoMaterno: {type: String, required: false},
	celular: {type: String, required: false},
    vuelos: {
        identificador: {type: String, required: false}
    }
},  {
    timestamps: false,
    versionKey: false
    }
);


const usuarioSchema = new Schema({
	usuario: {type: String, required: true},
	contrasena: {type: String, required: true},
    usuarioAdmin: {type: usuarioAdminSchema},
    usuarioEmpleado: {type: usuarioEmpleadoSchema},
    usuarioCliente: {type: usuarioClienteSchema},
},  {
    timestamps: true,
    versionKey: false
    }
);

module.exports = model('Usuario', usuarioSchema);

