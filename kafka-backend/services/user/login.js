var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/keys");
let {customer} = require("../../../backend/models/data-model");


function handle_request(msg, callback) {
  console.log("Inside login kafka backend");
  console.log(msg);
  customer.find(
    {
      emailId: msg.emailId,
    },
    (err, result) => {
      if (err) {
        console.log("error");
      } else {
        if (result && result.length!=0) {
          console.log('this is result')
          console.log(result)
          // console.log(result[0].passwd, msg.passwd)
          console.log('password check:')
          console.log(bcrypt.compareSync(msg.passwd, result[0].passwd))
          if (bcrypt.compareSync(msg.passwd, result[0].passwd)) {
          // if(msg.passwd === result[0].passwd){
            const payload = {
              id: result[0]._id,
              role: 'customer'
            };
            console.log(result[0]._id)
            const token = jwt.sign(payload, secret);
            // res.status(200).end("JWT " + token);
            callback(null, {cust: result[0]._id, token});
            // res.send(result)
          } else {
            console.log("wrong password");
            callback(null, "Wrong Password");
          }
        } else {
          console.log("User doesn't exist");
          callback(null, "User doesn't exist");
        }
      }
    }
  );

  console.log("after callback");
}

exports.handle_request = handle_request;
