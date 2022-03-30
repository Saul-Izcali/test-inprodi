// external importation
import { body, check, param } from "express-validator";

// own importation
import validateResult from '../helpers/validateHerlper';
import  UserModel  from '../models/user'

const baggageValidator = {};

baggageValidator.addUserBaggage = [
	param("id").notEmpty().isMongoId(),
	body("flightId").notEmpty().isMongoId(),
	body("userId").notEmpty().isMongoId(),
	(req, res, next) => {
        validateResult(req, res, next)
    }
];


export default baggageValidator;