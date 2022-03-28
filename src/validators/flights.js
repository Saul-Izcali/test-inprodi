// external importation
import { body, check } from "express-validator";

// own importation
import validateResult from '../helpers/validateHerlper';

const createFlightValidation = [
    body("nameFlight").notEmpty(),
	body("origin").notEmpty().isLength({ min : 2 }),
	body("destination").notEmpty().isLength({ min : 2 }),
	body("startTime").isDate().notEmpty(),
	body("arrivalTime").isDate().notEmpty(),
	body("totalCapacity").customSanitizer(Number).custom(value => !isNaN(value) && value >= 5 && value <= 200),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const flightFilterByName = [
	body("nameFligth").notEmpty(),
	(req, res, next) => {
        validateResult(req, res, next)
    }
];

const flightFilterByDate = [
	body("start").notEmpty().isDate(),
	body("end").notEmpty().isDate(),
	(req, res, next) => {
        validateResult(req, res, next)
    }
];

export  {createFlightValidation, flightFilterByName, flightFilterByDate};