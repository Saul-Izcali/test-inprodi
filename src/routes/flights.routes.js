// external importation
import { Router } from 'express'

// own importation
import  flightsController  from '../controllers/flights.controller';
import  createFlightValidation  from '../validators/flights';
import  {verifyToken, isClient, isEmployee, isAdmin}  from '../middleware/auth'

const router = Router();


router.get('/see-flights-client', (req, res) => {
    res.render('flights-client-view')
})

router.get('/flight-form', (req, res) => {
    res.render('create-flight-view')
})


router.post('/create-flights/', verifyToken, isAdmin, createFlightValidation , flightsController.createFlight);


export default router;
