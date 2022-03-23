const { Schema, model } = require('mongoose');

import { verifyFlightHours } from "src/methods/flight.methods";

const vuelosSchema = new Schema({
	nombreVuelo     : {type: String, required: true},
	origen          : {type: String, required: true},
	destino         : {type: String, required: true},
	tiempoPartida   : {type: Date, required: true},
	tiempoLlegada   : {type: Date, required: true},
	capacidadTotal  : {type: Number, required: true},
	capacidadActual : {type: Number, required: false, default : 0},
    clientsIds      : { type : [Schema.Types.ObjectId], default : () => [] },
    // clientes        : [{
    //     identificador: {type: String, required: false},
    //     nombre: {type: String, required: false},
    //     equipaje: {type: String, required: false},
    // }]
},  {
    timestamps: true,
    versionKey: false
    }
);

vuelosSchema.method.verifyFlightHours = verifyFlightHours.bind(vuelosSchema);

module.exports = model('vuelo', vuelosSchema, "vuelos");
