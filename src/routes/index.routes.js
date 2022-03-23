const { Router } = require('express');

const router = Router();


router.get('/', (req, res) => {
    res.render('login')
})

router.get('/ingresar', (req, res) => {
    res.render('login')
})



export default router;
