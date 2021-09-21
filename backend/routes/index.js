const { Router } = require('express');

const { createCustomer,loginCustomer } = require('../controllers/customer');
const { customerRegistrationValidationRules, 
    validate, } = require('../controllers/validationRules');

const router = Router();

//root route
router.get('/', (req, res)=>{
    res.send('This is root');
});

router.post('/register/customers',
 customerRegistrationValidationRules,
 validate,
 createCustomer);

router.get('/login/customers',
    loginCustomer);

module.exports = router;