import  {Router}  from 'express'
import authController from '../controllers/auth.controller'

const router = Router();


router.get('/', (req, res) => {
    res.render('login-view')
})

router.get('/signin', (req, res) => {
    res.render('login-view')
})

router.post('/login', authController.login)



export default router;
