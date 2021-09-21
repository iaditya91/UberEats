const { Router } = require('express');

const { createCustomer } = require('../controllers/customer');

const router = Router();

//root route
router.get('/', (req, res)=>{
    res.send('This is root');
});

router.post('/register/customers', createCustomer);

module.exports = router;