// external importation
import { body, check, param } from "express-validator";


// own importation
import validateResult from '../helpers/validateHerlper'

const validateCreateUser = [
    body('name').notEmpty(),
    body('lastName').notEmpty(),
    body('phone').notEmpty().isLength({ min : 10, max : 10 }).customSanitizer(Number),
    body('userName').notEmpty(),
    body('password').notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];

const validateCreateAdmin = [
    body('userName').notEmpty(),
    body('password').notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
];


export  {validateCreateUser, validateCreateAdmin};