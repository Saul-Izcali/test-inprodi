const { Schema, model } = require('mongoose');

const equipajeSchema = new Schema({
	// identificador: {type: String, required: true},
	nombre: {type: String, required: true},
    caracteristicas: {type: String, required: true},
},  {
    timestamps: true,
    versionKey: false
    }
);


module.exports = model('equipaje', equipajeSchema);
