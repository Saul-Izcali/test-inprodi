import { body, param } from "express-validator";
import { Types } from "mongoose";

const usuariosController = {};

import { createValidator } from "../helpers";

const vuelosM = require('../model/Vuelos');

const createFlightValidation = createValidator([
    body("nombreVuelo").notEmpty(),
	body("origen").notEmpty(),
	body("destino").notEmpty().isLength({ min : 2 }),
	body("tiempoPartida").customSanitizer(Date).isDate(),
	body("tiempoLlegada").customSanitizer(Date).isDate(),
	body("capacidadTotal").customSanitizer(Number).custom(value => !isNaN(value) && value >= 5 && value <= 200),
	body("capacidadActual").isDate(),
]);

const createFlightRoute = async (req, res) => {
    try {
        const { tiempoPartida, tiempoLlegada } = req.body;

        const validHours = await FlightModel.verifyFlightHours(tiempoPartida, tiempoLlegada);

        await FlightModel.create(req.body);
    
        // res.status(200).json({'estado': 'ok'})
        return res.redirect('ver-vuelos-empleado')
    } catch (err) {
        RocketLogger.error(err);

        return res.status(500).send({ err : "Couldn't create flight" });
    }
};

export const createFlight = [createFlightValidation, createFlightRoute];


usuariosController.vuelosCliente = async (req, res) => {
    const vuelos = await vuelosM.find().lean();
    console.log(vuelos)
    
    res.render("vuelos-cliente", {vuelos: vuelos})
};

usuariosController.vuelosEmpleado = async (req, res) => {
    const vuelos = await vuelosM.find().lean();
    console.log(vuelos)
    
    res.render("vuelos-empleado", {vuelos: vuelos})
};


usuariosController.asistirVuelo = async (req, res) => {
    const obtenerVuelo = await vuelosM.findById(req.params.id);
    
    obtenerVuelo.clientes = [{
        identificador: "id usr",
        nombre: "nombre usr",
        equipaje: "id equipaje"
    }]
    
    console.log(obtenerVuelo)

    await vuelosM.findByIdAndUpdate(req.params.id, obtenerVuelo);

    console.log("vuelo editado")

    const vuelos = await vuelosM.find().lean();
    
    res.render("vuelos-cliente", {vuelos: vuelos})
};

const flightDetailValidation = createValidator([
    param("id").notEmpty().isMongoId(),
]);

const flightDetailRoute = async (req, res) => {
    try {
        const flight = await FlightModel.aggregate([
            { $match : {
                _id : new Types.ObjectId(req.params.id),
            } },
            {
                $lookup : {
                    from         : "users",
                    localField   : "clientsIds",
                    foreignField : "_id",
                    as           : "users",
                },
            },
            {
                $project : {
                    "users.name"    : 1,
                    "users.luggage" : 1,
                },
            },
        ]).exec()

        if (!flight) {
            return res.status(404).send({ err : "Flight not found." });
        }

        return res.render("detalles-vuelos", { flight });
    } catch (err) {
        console.error("[vuelos.controller -> flightDetail] ", err);

        return res.status(500).send({ err : "Couldn't load flitht details" });
    }
};

export const flightDetail = [flightDetailValidation, flightDetailRoute];


module.exports = usuariosController;
