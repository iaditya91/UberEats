var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../../backend/config/keys");
// let { customer } = require("../../../backend/models/data-model");
let {customer} = require("../../../backend/models/data-model");

async function handle_request(msg, callback) {
  console.log("Inside update kafka backend");
  console.log("msg");
  console.log(msg);
  const oldmsg = msg;
  delete msg["custId"]; 
  const updatecust = await customer.updateOne(
    { _id: oldmsg.custId },
    { $set: msg },
    (err, result) => {
      if (err) {
        console.log("error");
      } else {
        if (result && result.length != 0) {
          console.log("this is result");
          console.log(result);
          callback(null, result);
        } else {
          console.log("User doesn't exist");
          callback(null, "User doesn't exist");
        }
      }
    }
  );
}

console.log("after callback");
exports.handle_request = handle_request;