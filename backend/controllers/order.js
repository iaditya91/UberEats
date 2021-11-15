const {
  cart,
  dish,
  order,
  orderDishes,
} = require('../models/data-model');
var object_id = require('mongodb').ObjectId;
let {secret} = require('../config/keys')
var kafka = require('../kafka/client')

const initOrder = async (req, res) => {
  try{
    const {custId} = req.params
      const orderPlacedTime = Date.now();
      msg_payload_total = Object.assign(
        req.body,
        { custId },
        { orderPlacedTime },
        { orderStatus: 'Placed' }
      );
      console.log("msg_payload_total");
      console.log(msg_payload_total);

      kafka.make_request("initOrder", msg_payload_total, function (err, results) {
        if (err) {
          console.log("inside err");
          res.json({
            status: "error",
            msg: "system error, try again.",
          });
        } else {
          console.log("inside router post");
          console.log(results);
          res.status(200).send(results);
        }
      });
} catch (error) {
  return res.status(500).json({ error: error.message });
}
};
//   try {
//     const { custId } = req.params;
//     console.log(req.body);
//     const {orderType, price,restId, taxPrice, totalPrice, orderAddress, dishes, orderNote} = req.body;
//     console.log(restId);
//     const orderPlacedTime = Date.now();
//     const orderEntry = await order.create(
//       {
//         price,
//         taxPrice,
//         totalPrice,
//         custId,
//         restId,
//         orderType,
//         orderAddress,
//         orderPlacedTime,
//         orderStatus: 'Placed',
//         dishes,
//         orderNote
//       },
//     );
//     return res.status(200).json({ orderEntry, message: 'Order Placed Successfully!' });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };

const getLatestOrder = async (req, res) => {
  try {
    const { custId } = req.params;
    if (String(req.headers.id) !== String(custId)) {
      return res.status(401).json({ error: 'Unauthorized request!' });
    }
    const latestOrder = await order.findOne({
      where: { custId },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ latestOrder });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getRestaurantOrders = async (req, res) => {
  try {
    const { restId } = req.params;
    // if (String(req.headers.id) !== String(restId)) {
    //   return res.status(401).json({ error: 'Unauthorized request!' });
    // }
    const restaurantOrders = await order.find({ restId }).populate({path:'restId',model:'restaurant'}).populate({path:'custId',model:'customer'}); //.populate({path:'cartId',model:'cart',populate:{path:'dishes.dish', model:'dish'}});
    console.log(restaurantOrders);
    // const dishdetails = await orderDishes.find({restaurantOrder["_id"]}).populate();
    // include: [{ model: orderDishes, include: [{ model: dish }] }],
    // order: [['createdAt', 'DESC']],
    return res.status(200).json({ restaurantOrders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCustomerOrders = async (req, res) => {
  try {
    const { custId } = req.params;
    // if (String(req.headers.id) !== String(custId)) {
    //   return res.status(401).json({ error: 'Unauthorized request!' });
    // }
    const customerOrders = await order.find({ custId }).populate({path:'restId',model:'restaurant'}).populate({path:'dishes.dish',model:'dish'});
    return res.json({ customerOrders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { restId } = req.params;
    console.log('inside updateorder')
    // if (String(req.headers.id) !== String(restId)) {
    //   return res.status(401).json({ error: 'Unauthorized request!' });
    // }
    const { orderStatus, orderId } = req.body;
    if (!orderStatus) {
      return res
        .status(400)
        .json({ error: 'Please specify updated order status!' });
    }
    if (!orderId) {
      return res.status(400).json({ error: 'Order not found!' });
    }
    console.log(orderId, orderStatus)
    const updatedOrder = await order.updateOne(
      {_id: object_id(orderId)},{$set: {"orderStatus": orderStatus}}
    );
    console.log(updatedOrder)
    return res
      .status(200)
      .json({ message: 'Order status updated!', updatedOrder });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOrderDetailsById = async (req, res) => {
  try {
    const { orderId, custId } = req.params;
    if (String(req.headers.id) !== String(custId)) {
      return res.status(401).json({ error: 'Unauthorized request!' });
    }
    const orderDetails = await order.findAll({
      where: { custId, orderId },
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ orderDetails });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  initOrder,
  // createOrder,
  getLatestOrder,
  updateOrder,
  getRestaurantOrders,
  getCustomerOrders,
  getOrderDetailsById
};
