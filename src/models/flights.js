import {  Schema, model  } from 'mongoose'
import   mongoosePaginate  from 'mongoose-paginate-v2'
// import { verifyFlightHours } from "src/methods/flight.methods";

const flightsSchema = new Schema({
	nameFlight      : {type: String, required: true},
	origin          : {type: String, required: true},
	destination     : {type: String, required: true},
	startTime       : {type: Date, required: true},
	arrivalTime     : {type: Date, required: true},
	totalCapacity   : {type: Number, required: true},
	currentCapacity : {type: Number, required: false, default : 0},
    clientsIds      : [{ type : Schema.Types.ObjectId, default : () => [] }],
},  {
    timestamps: true,
    versionKey: false
    }
);

// vuelosSchema.method.verifyFlightHours = verifyFlightHours.bind(flightsSchema);

flightsSchema.plugin(mongoosePaginate);

const FlightsModel = model('Flight', flightsSchema, "flights");

export default FlightsModel;
