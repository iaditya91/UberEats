const bcrypt = require('bcrypt');
const { customer } = require('../models/data_model');

const {
    genereateAccessToken, generateAccessToken,
} = require('../middleware/validateToken');

const createCustomer = async (req, res)=>{
    try{
        console.log('inside create customer');
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
        res.status(404).json({ error: error.message });
    }
};

const loginCustomer = async (req, res)=>{
    try {
        const {emailId, passwd} = req.body;
        if(!emailId || !passwd){
            return res.send(404).json({ error: 'Please enter all fields!'});
        }
        const existingCustomer = await customer.findOne({
            where: {emailId}
        });
        if(!existingCustomer){
            return res.status(404).json({ error:'Email not found please register!'});
        }
        bcrypt.compare(passwd, existingCustomer.passwd, (err)=>{
            if(err){
                return res.status(401).json({ error: 'Invalid Password'});
            }
            const new_token = generateAccessToken(existingCustomer.custId, 'customer');
            return res.status(200).json({token: new_token, message:'login successful!'});
        });
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
    return null;
};

module.exports = {
    createCustomer, 
    loginCustomer
};