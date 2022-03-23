const { Schema, model } = require('mongoose');

// Import Own Modules
import * as roles from "../access/roles";

const userSchema = new Schema({
    nombre          : { type : String, required: false},
	apellidoPaterno : { type : String, required: false},
	apellidoMaterno : { type : String, required: false},
	celular         : { type : String, required: false},
    account_type    : { type : String, enum : Object.values(roles) },
    contrasena      : { type : String, required: true},
    puesto          : { type : String },
}, {
    timestamps: true,
    versionKey: false
});

const UserModel = model("user", userSchema, "users");

export default UserModel;

