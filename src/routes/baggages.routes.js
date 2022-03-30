// external importation
import { Router } from 'express'

// own importation
import  baggageController  from '../controllers/baggages.controller';
import  baggageValidator  from '../validators/baggages';
import  {verifyToken, isClient, isEmployee, isAdmin}  from '../middleware/auth'


const router = Router();


// req.params = id baggage or name baggage
// req.body   = id user & id flight
router.put('/add-user-baggage/:id', verifyToken, isClient, baggageValidator.addUserBaggage, baggageController.addBaggage);

router.put('/delete-user-baggage/', verifyToken, isEmployee, baggageController.deleteBaggage);


export default router;
