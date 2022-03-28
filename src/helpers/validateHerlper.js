import check, { validationResult } from 'express-validator';

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(403);
        res.send({ e:'error here' , errors: err.array() })
    }
}


export default validateResult
