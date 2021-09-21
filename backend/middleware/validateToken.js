const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env')});

const { customer } = require('../models/data_model');

const generateAccessToken = (id, role) => {
    jwt.sign({id, role}, process.env.TOKEN_STRING, {expiresIn: '1h'});
}

const authenticateToken = (req, res, next)=>{
    if(req.url === '/api/register/customers' 
    || req.url === '/api/register/restaurants' 
    || req.url === '/api/login/customers'
    || req.url === '/api/regiser/restaurants'){
        next();
        return;
    }

    const token = req.headers.authorization;
    if(token === null){
        return res.status(403).json({ error: 'Forbidden request!'});
    }

    jwt.verify(token, String(process.env.TOKEN_STRING), async(err, decoded)=>{
        if(err){
            return res.status(403).json({ error: 'Forbidden request!'});
        }

        const { id, role } = decoded;
        if(role === 'customer'){
            const user = await customer.findOne({
                where: {custId: id},
            });
            if(user){
                req.headers.id = id;
                req.headers.role = role;
                next();
                return;
            }
            return res.status(404).json({message:'User not found!'})
        }

        if(role === 'restaurant'){
            const user = await customer.findOne({
                where: {restId: id},
            });
            if(user){
                req.headers.id = id;
                req.headers.role = role;
                next();
                return;
            }
            return res.status(404).json({message:'User not found!'});
        }
        
        return res.status(403).json({message:'Forbidden request!'});

    });

}

module.exports = {
    generateAccessToken, authenticateToken
};