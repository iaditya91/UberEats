const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { customer, customerAddress, custFavs, restaurant } = require('../models/data-model');
var objectId = require('mongodb').ObjectId;
const {
  generateAccessToken,
} = require('../middleware/validateToken');
let {secret} = require('../config/keys')
var kafka = require('../kafka/client')

const createCustomer = async (req, res) => {
  try {
    // Check if email already exists
      kafka.make_request("signup", req.body, function(err, results){
        if(err)
        {
        console.log('inside err');
        res.json({
          status: 'error',
          msg: 'system error, try again.'
        });}

        else{
          console.log('inside router post');
          console.log(results)
          res.status(200).send(results);
        }
    });
  }catch(error){
    console.log(error)
  }};
  // try{
  //   const checkUser = await customer.findOne(
  //     { emailId: req.body.emailId },
  //   );
  //   console.log(checkUser)
  //   if (checkUser) {
  //     return res.status(409).json({
  //       error:
  //         "There's already an account with this email. Please sign in.",
  //     });
  //   }
  //   // Else create new customer
  //   req.body.passwd = await bcrypt.hash(req.body.passwd, 12); // crypt the password
  //   const cust = await customer.create(req.body);
  //   const token = generateAccessToken(cust.custId, 'customer');
  //   return res.status(201).json({
  //     cust,
  //     token,
  //   });
  // } catch (error) {
  //   return res.status(500).json({ error: error.message });
  // }
  // };

const loginCustomer = async (req, res) => {
  try {
    kafka.make_request("login", req.body, function(err, results){
      if(err)
      {
      console.log('inside err');
      res.json({
        status: 'error',
        msg: 'system error, try again.'
      });}

      else{
        console.log('inside router post');
        console.log(results)
        res.status(200).send(results);
      }
  });
}catch(error){
  console.log(error)
}};
// try{
//     const { emailId, passwd } = req.body;
//     if (!emailId || !passwd) {
//       return res
//         .status(401)
//         .json({ error: 'Please input all fields!' });
//     }
//     const existingCustomer = await customer.findOne({
//       where: { emailId },
//     });
//     if (!existingCustomer) {
//       return res
//         .status(404)
//         .json({ error: 'Email not found! Please register!' });
//     }
//     bcrypt.compare(passwd, existingCustomer.passwd, (err) => {
//       if (err) {
//         return res.status(401).json({ error: 'Invalid password!' });
//       }
//       // const token = generateAccessToken(
//       //   existingCustomer._id,
//       //   'customer',
//       // );
//       const token = jwt.sign({
//         id:existingCustomer._id,
//         role:'customer',
//       },'secret',{
//         expiresIn: 1008000
//       });
//       return res
//         .status(200)
//         .json({ message: 'Login successful', token });
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
//   return null;
// };

const getCustomer = async (req, res) => {
  try {
    const { custId } = req.params;
    // if (String(req.headers.id) !== String(custId)) {
    //   return res.status(401).json({ error: 'Unauthorized request!' });
    // }
    const user = await customer.findOne(
     { _id:custId }
    );
    if (!user) {
      return res.status(404).json({
        error: 'Customer with the specified ID does not exist!',
      });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    // Check if email already exists
    // const { custId } = req.params;
    //   paramters = [req.body, custId]
    msg_payload_total = Object.assign(req.body, req.params);
      kafka.make_request("update_customer", msg_payload_total, function(err, results){
        if(err)
        {
        console.log('inside err');
        res.json({
          status: 'error',
          msg: 'system error, try again.'
        });}

        else{
          console.log('inside router post');
          console.log(results)
          res.status(200).send(results);
        }
    });
  }catch(error){
    return res.status(500).json({ error: error.message });
  }};
//   try {
//     const { custId } = req.params;
//     // if (String(req.headers.id) !== String(custId)) {
//     //   return res.status(401).json({ error: 'Unauthorized request!' });
//     // }
//     req.body.passwd = await bcrypt.hash(req.body.passwd, 12);
//     const updated = await customer.updateOne(
//        { _id:custId },{$set:req.body}
//     );
//     console.log(custId)
//     console.log(updated)
    
//     if (updated) {
//       const updatedUser = await customer.findOne(
//          { _id:custId }
//       );
//       return res.status(200).json({ user: updatedUser });
//     }
//     return res.status(404).json({ error: 'User not found!' });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

const addCustomerAddress = async (req, res) => {
  try {
    const { custId } = req.params;
    // if (String(req.headers.id) !== String(custId)) {
    //   return res.status(401).json({ error: 'Unauthorized request!' });
    // }
    const { address } = req.body;
    
    if (!address) {
      return res.status(400).json({ error: 'Please enter address!' });
    }
    const checkExistingAddress = await customerAddress.findOne({
      custId: custId,
      address,
    });
    console.log(address,0)
    console.log(checkExistingAddress)
    if(checkExistingAddress){
    if (checkExistingAddress.address === address) {
      return res
        .status(409)
        .json({ error: 'Address already exists!' });
    }}
    console.log(address,1)
    const cust = await customerAddress.create({
      custId,
      address,
    });
    return res
      .status(200)
      .json({ message: 'Address added successfully!', cust });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { custId } = req.params;
    const deleted = await customer.destroy(
       { custId }
    );
    if (deleted) {
      return res
        .status(200)
        .json({ message: 'Customer deleted successfully!' });
    }
    return res.status(404).json({ error: 'User not found!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCustomerAddresses = async (req, res) => {
  try {
    const { custId } = req.params;
    // if (String(req.headers.id) !== String(custId)) {
    //   return res.status(401).json({ error: 'Unauthorized request!' });
    // }
    console.log(custId);
    console.log(req.params)
    const existingAddresses = await customerAddress.find({
      custId
    });
    if (!existingAddresses) {
      return res.status(409).json({ error: 'No addresses found!' });
    }
    return res.status(200).json({ existingAddresses });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCustomerFavourites = async (req, res) => {
  try {
    const { custId } = req.params;
    // if (String(req.headers.id) !== String(custId)) {
    //   return res.status(401).json({ error: 'Unauthorized request!' });
    // }
    const favRests = await custFavs.find( { custId }).populate({path:'restId',model:'restaurant'}).populate({path:'custId',model:'customer'});
    return res.status(200).json({ favRests });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const setCustomerFavourites = async (req, res) => {
  try {
    const { custId } = req.params;
    // if (String(req.headers.id) !== String(custId)) {
    //   return res.status(401).json({ error: 'Unauthorized request!' });
    // }
    const {restId} = req.body;
    console.log(custId," ", restId);

    const checkExisting = await custFavs.findOne({
      $and:[{ restId: objectId(restId),custId: objectId(custId) }],
    }
    );
    if (checkExisting) {
      return res.status(409).json({
        error:
          "Restaurant already set as favourite",
      });
    }
    await custFavs.create({
        restId, custId
      });
    return res.status(200).json({ message: "Favorite restuarant set!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllCustomerRestaurants = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { city } = req.params;
    console.log(city);
    if(city=='nocity'){
      var restaurants = await restaurant.find({});
    }
    else{
      var restaurants = await restaurant.find( { city } );
    }
    if (!restaurants) return res.status(404).json({ error: 'Restaurant not found!' });
    return res.status(200).json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCustomer,
  loginCustomer,
  getCustomer,
  updateCustomer,
  addCustomerAddress,
  getCustomerAddresses,
  getCustomerFavourites,
  setCustomerFavourites,
  deleteCustomer,
  getAllCustomerRestaurants,
};
