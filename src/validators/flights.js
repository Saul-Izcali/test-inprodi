// external importation
import { body, check } from "express-validator";

// own importation
import validateResult from '../helpers/validateHerlper';
import  UserModel  from '../models/user'


const createFlightValidation = [
    body("nameFlight").notEmpty(),
	body("origin").notEmpty().isLength({ min : 2 }),
	body("destination").notEmpty().isLength({ min : 2 }),
	body("startTime").isDate().notEmpty(),
	body("arrivalTime").isDate().notEmpty(),
	body("totalCapacity").customSanitizer(Number).custom(value => !isNaN(value) && value >= 5 && value <= 200),
	// body("clientsIds").custom( value => { userClient(value)}),
    (req, res, next) => {
		validateResult(req, res, next)
    }
];

function userClient(value) {
	const ids = []

	value.forEach(element => {
		ids.push(element._id)
			// let user = UserModel.find({_id: { $in : element._id}}).then(function(user) {
			// 	console.log(user)
			// })
			// const user = await UserModel.findById(element._id)
			// console.log(user)
	});
	console.log(ids)

	const users =  UserModel.find({ '_id': { $in: ids } }).then((u) => {
			console.log(u)
	})
}

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