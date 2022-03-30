// const { Schema, model } = require('mongoose');
import { Schema, model } from 'mongoose'
import roles from './roles';
import flights from './flights';

// Import Own Modules

const baggageSchema = new Schema({
    name            : String,
    description     : String
}, {
    timestamps: true,
    versionKey: false
});

const BaggageModel = model("Baggage", baggageSchema, "baggages");

export default BaggageModel;

