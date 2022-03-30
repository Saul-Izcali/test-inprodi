//external importation
import { Schema, model } from 'mongoose'

// own importation
import roles from './roles';
import flights from './flights';

const userSchema = new Schema({
    userName        : { type : String, required: false},
    password        : { type : String, required: true},
    name            : { type : String, required: false},
	lastName        : { type : String, required: false},
	phone           : { type : String, required: false},
    position        : { type : String },
    travelPoints    : { type : Number, default : 0 },
    flights         : [{ref: "Flight",  type : Schema.Types.ObjectId}], 
    roles           : [{ref: "Role",    type : Schema.Types.ObjectId}]
    // account_type    : { type : String, enum : Object.values(roles) },
}, {
    timestamps: true,
    versionKey: false
});

const UserModel = model("user", userSchema, "users");

export default UserModel;

