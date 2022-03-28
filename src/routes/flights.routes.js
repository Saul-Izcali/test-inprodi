// external importation
import { Router } from 'express'

// own importation
import  flightsController  from '../controllers/flights.controller';
import  {createFlightValidation, flightFilterByName, flightFilterByDate}  from '../validators/flights';
import  {verifyToken, isClient, isEmployee, isAdmin}  from '../middleware/auth'

const router = Router();


router.get('/see-flights-client', (req, res) => {
    res.render('flights-client-view')
})

router.get('/flight-form', (req, res) => {
    res.render('create-flight-view')
})


router.post('/create-flights/', verifyToken, isAdmin, createFlightValidation , flightsController.createFlight);
router.get('/show-flights-paginate/', verifyToken, isEmployee, flightsController.showFlightsPaginate);
router.post('/show-flights-by-name/', verifyToken, isEmployee, flightFilterByName, flightsController.getFlightsFilterByName);
router.post('/show-flights-by-date/', verifyToken, isEmployee, flightFilterByDate, flightsController.getFlightsFilterByDate);
    // en estos casos es mejor dejarlo asi o que sea una peticion del tipo get y pasar el dato por params
router.put('/delete-users-flight/:id', verifyToken, isEmployee, flightsController.deleteUsersFlight);

export default router;
