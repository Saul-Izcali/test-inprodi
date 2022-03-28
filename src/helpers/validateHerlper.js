import check, { validationResult } from 'express-validator';

const validateResult = (req, res, next) => {
    try {
        // console.log(req.body.clientsIds)
        // console.log(req.body)
        validationResult(req).throw()
        return next()
    } catch (err) {
        // res.status(403);
        res.status(403).send({ e:'error here' , errors: err.array() })
    }
}


export default validateResult
