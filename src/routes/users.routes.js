// external importation
import { Router } from 'express'

// own importation
import  usersController  from '../controllers/users.controller';
import  {validateCreateUser, validateCreateAdmin}  from '../validators/users';


const router = Router();

// routes render views
router.get('/client-form', (req, res) => {
    res.render('create-client-view')
})

router.get('/employee-form', (req, res) => {
    res.render('create-employee-view')
})

// routes create users
router.post('/create-user/', validateCreateUser , usersController.createUser);
router.post('/create-admin/', validateCreateAdmin , usersController.createUser);
// router.post('/create-client/', validateCreateUser , usersController.createClient);
// router.post('/create-employee/', validateCreateUser , usersController.createEmployee);


export default router;