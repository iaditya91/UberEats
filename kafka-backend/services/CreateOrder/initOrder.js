var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../../backend/config/keys");
// let order = require("../models/orderModel");
let {order} = require("../../../backend/models/data-model");

async function handle_request(msg, callback) {
  console.log("Inside Order kafka backend");
  console.log("msg");
  console.log(msg);
  const newOrder = new order(msg);
  console.log("Inside newOrder");
  console.log(newOrder);
  newOrder
    .save()
    .then((result) => {
      console.log('order created!')
      callback(null, { result, message: "Order Placed!" });
    })
    .catch((err) => {
      console.log(err);
      callback(null,err)
    });
}

console.log("after callback");
exports.handle_request = handle_request;