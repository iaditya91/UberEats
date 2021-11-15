var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../../backend/config/keys");
let {customer} = require("../../../backend/models/data-model");

async function handle_request(msg, callback) {
  console.log("Inside cust update kafka backend");
  console.log(msg);
//     console.log(msg[1], msg[0])
//   const custId  = msg[1];
//   const msg = msg[0]
//   console.log(custId, msg)
      // if (String(req.headers.id) !== String(custId)) {
      //   return res.status(401).json({ error: 'Unauthorized request!' });
      // }
      console.log(msg.passwd)
      if(msg.passwd){
        msg.passwd = await bcrypt.hash(msg.passwd, 12);
      }
     customer.updateOne({ _id:msg.custId },{$set:msg},(err, result) => {
            if (result) {
                    const updatedUser =  customer.findOne({ _id:msg.custId }, (err, result)=>{
                    if(result){
                            console.log('customer details updated successfully')
                            callback(null, { user: updatedUser });
                        }
                    if(err){
                            callback(null, { error: 'User not found!' });
                    }
                });
                
            }
            if(err){
                callback(null, { error: err.message });
                console.log("after callback");
            };
        })
        //   .then((user) => res.json(user))
        // .catch((err) => res.status(400).json("Error: " + err));
        // console.log("after callback");
    }

//   customer.findOne({ emailId }, (err, result) => {
//     if (result) {
//       console.log("found");
//       console.log(result);
//       callback(null, "Already exists");
//     } else {
//       newCustomer.save((err, result) => {
//         if (err) {
//           console.log(err);
//           // res.status(500).send();
//         } else {
//           const payload = {
//             id: result._id,
//             role: 'customer',
//           };
//           const token = jwt.sign(payload, secret);
//           callback(null, "JWT " + token);
//         }
//       });
//     }
//   });

  // .then((user) => res.json(user))
  // .catch((err) => res.status(400).json("Error: " + err));

  // callback(null,results);
//   console.log("after callback");
// }

exports.handle_request = handle_request;
