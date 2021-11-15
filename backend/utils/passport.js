var JWTStrategy = require("passport-jwt").Strategy;
var ExtractJWT = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("../config/keys");
const { customer }= require("../models/data-model");

function auth(){
    var options = {
        jwtFromRequest : ExtractJWT.fromAuthHeaderWithScheme("jwt"),
        secretOrKey : secret
    };
    passport.use(
        
        new JWTStrategy(options, (jwt_payload, callback)=>{
            console.log('in passport',options.jwtFromRequest);
            const cust_id = jwt_payload._id;
            customer.findById(cust_id,(err, results) => {
                if(err){
                    return callback(err,false);
                }
                if(results){
                    callback(null, results);
                }
                else{
                    callback(null, false);
                }
            })
        })
    )
}


exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt",{session : false});