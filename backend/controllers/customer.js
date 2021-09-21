const bcrypt = require('bcrypt');
const { customer } = require('../models/data_model');

const {
    genereateAccessToken,
} = require('../middleware/validateToken');

const createCustomer = async (req, res)=>{
    try{
        const checkUser = await customer.findOne({
         where: { emailId: req.body.emailId}
    });
    if(checkUser){
        console.log('User already exists!');
        res.status(404).json({ error: 
            "There's already an user exists with same mailId!"
        });
    }
    req.body.passwd = await bcrypt.hash(req.body.passwd, 12);
    const cust = await customer.create(req.body);
    const token = genereateAccessToken(req.headers.id, "customer");
    return res.status(201).json({
        cust,
        token,
    });}
    catch(error){
        res.status(404).json({ error: error.message});
    }
};

module.exports = {
    createCustomer,
};