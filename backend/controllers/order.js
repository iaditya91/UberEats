const {
  cart,
  dish,
  order,
  orderDishes,
} = require('../models/data-model');

const initOrder = async (req, res) => {
  try {
    const { custId } = req.params;
    const {orderType, price, taxPrice, totalPrice, orderAddress, cartItems, cartId} = req.body;
    const { restId } = cartItems[0];
    console.log(restId);
    const orderPlacedTime = Date.now();
    const orderEntry = await order.create(
      {
        price,
        taxPrice,
        totalPrice,
        custId,
        restId,
        orderType,
        orderAddress,
        orderPlacedTime,
        orderStatus: 'Placed',
        cartId
      },
    );
    const latestOrder = await order.findOne({
      where: { custId },
      order: [['createdAt', 'DESC']],
    });
    console.log(cartItems)
    cartItems.forEach(async (cartItem) => {
      await orderDishes.create(
        {
          orderId: orderEntry.orderId,
          dishId: cartItem.dishId,  
        },
      );
    });
    return res.status(200).json({ orderEntry, message: 'Order Placed Successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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
    const restaurantOrders = await order.find({ restId });
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
    const customerOrders = await order.findAll({
      where: { custId },
      include: [{ model: orderDishes, include: [{ model: dish }] }],
      order: [['createdAt', 'DESC']],
    });
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
    const updatedOrder = await order.update(
      { orderStatus},
      {where: {orderId}} ,
    );
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
