//external importation
import {  Schema, model  } from 'mongoose'
import   mongoosePaginate  from 'mongoose-paginate-v2'

// own importation
import flights from './flights';
import baggage from './baggage';
// import { verifyFlightHours } from "src/methods/flight.methods";


const flightsSchema = new Schema({
	nameFlight      : {type: String, 	required: true},
	origin          : {type: String, 	required: true},
	destination     : {type: String, 	required: true},
	startTime       : {type: Date, 		required: true},
	arrivalTime     : {type: Date, 		required: true},
	totalCapacity   : {type: Number, 	required: true},
	currentCapacity : {type: Number, 	required: false, default : 0},
    clientsData		: [{ 
		clientId	: {ref: "User", type : Schema.Types.ObjectId},
		accept		: {type : Boolean,	default: false},
		baggage		: {ref: "Baggage", type : Schema.Types.ObjectId}
					  }],
	// costPerSeat     : {type: Number, 	required: true},
},  {
    timestamps: true,
    versionKey: false
    }
);

// vuelosSchema.method.verifyFlightHours = verifyFlightHours.bind(flightsSchema);

flightsSchema.plugin(mongoosePaginate);

const FlightsModel = model('Flight', flightsSchema, "flights");

export default FlightsModel;
