import { Schema, model } from "mongoose";

const roleSchema = new Schema({
    name : { type : String, required: true}
}, {
    timestamps: true,
    versionKey: false
});

const rolesModel = model("Role", roleSchema, "roles");

export default rolesModel;