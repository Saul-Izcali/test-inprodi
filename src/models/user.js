// const { Schema, model } = require('mongoose');
import { Schema, model } from 'mongoose'
import roles from './roles';

// Import Own Modules
// import * as roles from "../access/roles";

const userSchema = new Schema({
    userName        : { type : String, required: false},
    password        : { type : String, required: true},
    name            : { type : String, required: false},
	lastName        : { type : String, required: false},
	phone           : { type : String, required: false},
    position        : { type : String },
    flights         : [{ type : String, required: false}],
    roles           : [{ref: "Role", type : Schema.Types.ObjectId}]
    // account_type    : { type : String, enum : Object.values(roles) },
}, {
    timestamps: true,
    versionKey: false
});

const UserModel = model("user", userSchema, "users");

export default UserModel;

