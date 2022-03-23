const { Schema, model } = require('mongoose');

const vuelosSchema = new Schema({
	nombreVuelo: {type: String, required: true},
	origen: {type: String, required: true},
	destino: {type: String, required: true},
	tiempoPartida: {type: Date, required: true},
	tiempoLlegada: {type: Date, required: true},
	capacidadTotal: {type: Number, required: true},
	capacidadActual: {type: Number, required: false},
    clientes: [{
        identificador: {type: String, required: false},
        nombre: {type: String, required: false},
        equipaje: {type: String, required: false},
    }]
},  {
    timestamps: true,
    versionKey: false
    }
);


module.exports = model('vuelos', vuelosSchema);
