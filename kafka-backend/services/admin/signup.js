var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../../backend/config/keys");
// let User = require("../../models/userModel");
// let Customer = require("../../models/CustomerModel");
let {restaurant} = require("../../../backend/models/data-model");

async function handle_request(msg, callback) {
  console.log("Inside signup kafka backend");
  console.log(msg);

  let name = msg.name;
  let emailId = msg.emailId;
  let passwd = await bcrypt.hash(msg.passwd, 10);
  let contactNo = msg.contactNo;

  const newRestaurant = new restaurant({
    name,
    emailId,
    passwd,
    contactNo,
  });
  restaurant.findOne({ emailId }, (err, result) => {
    if (result) {
      console.log("found");
      console.log(result);
      callback(null, "Already exists");
    } else {
      newRestaurant.save((err, result) => {
        if (err) {
          console.log(err);
          // res.status(500).send();
        } else {
          const payload = {
            id: result._id,
            role: 'restaurant',
          };
          const token = jwt.sign(payload, secret);
          callback(null, "JWT " + token);
        }
      });
    }
  });

  // .then((user) => res.json(user))
  // .catch((err) => res.status(400).json("Error: " + err));

  // callback(null,results);
  console.log("after callback");
}

exports.handle_request = handle_request;
