import {  Schema, model  } from 'mongoose'

// import { verifyFlightHours } from "src/methods/flight.methods";

const flightsSchema = new Schema({
	nameFligth      : {type: String, required: true},
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

const FlightsModel = model('flight', flightsSchema, "flights");

export default FlightsModel;
