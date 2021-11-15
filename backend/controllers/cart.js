const { cart, restaurant, dish } = require('../models/data-model');
var objectId = require('mongodb').ObjectId;

const insertItemsToCart = async (req, res) => {
  try {
    const { custId } = req.params;
    const existingCustomer = await cart.findOne({custId});
    if(existingCustomer){
      await cart.deleteOne({custId})
    }
    await cart.create({
      custId,
      restId:req.body.restaurant._id,
      dishes:req.body.dishes
    });
    res.status(200).json({ msg: 'dish added successfully!' })
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const viewCart = async (req, res) => {
  try {
    const { custId } = req.params;
    const cartItems = await cart.findOne({custId:objectId(custId)}).populate({path:'dishes.dish',model:'dish'}).populate({path:'restId',model:'restaurant'}).populate({path:'custId',model:'customer'});
    if (!cartItems) {
        return res.status(200).json({ message: 'No items in cart!' });
    }
    return res.status(200).json({ cartItems });
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteCart = async (req, res) => {
  try {
    const { custId } = req.params;
    const cartItems = await cart.findOne({custId});
    if (!cartItems) {
        return res.status(200).json({ message: 'No cart!' });
    }
    await cart.deleteOne({custId});
    return res.status(200).json({ msg:"Cart deleted successfully!" });
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const addItemToCart = async (req, res) => {
  try {
    const { custId,dishId } = req.params;
    console.log(req.body)
    // console.log(custId, dishId)
    const existingCart = await cart.findOne({custId});
    // console.log(existingCart)
    if(!existingCart){
      await cart.create({
        custId,
        restId:req.body.dishId.restId
      });
    }
    else if (existingCart.restId !== req.body.dishId._id || existingCart.restId==null){
      await cart.updateOne({ custId },{$set:{restId:req.body.dishId._id}});
    }
    await cart.find({custId,"dishes.dish":{$nin:[req.body.dishId._id]}}).update({$addToSet:{dishes:{dish:req.body.dishId._id, quantity:req.body.quantity}}});
    return res.status(200).json({ msg:"Item added successfully!" });
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteItemFromCart = async (req, res) => {
  try {
    const { custId } = req.params;
    // console.log(req.body)
    // console.log(custId)
    const existingCart = await cart.findOne({custId});
    if(!existingCart){
      return res.status(500).json({msg:'no cart found!'});
    }
    else if(req.body.quantity<=0){
      // console.log()
      const resp = cart.updateOne(
          { custId},
          { $pull: { "dishes": { "dish": req.body.dishId._id } } }
      );
      return res.status(200).json({resp, msg:'item quantity updated successfully!'});
    }
    await cart.updateOne({custId,"dishes.dish":req.body.dishId._id},{$set:{"dishes.$.quantity": req.body.quantity}});
    return res.status(200).json({msg:'item deleted successfully!'});
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const updateItemQuantity = async (req, res) => {
  try {
    const { custId } = req.params;
    // console.log(req.body)
    // console.log(custId)
    const existingCart = await cart.findOne({custId});
    if(!existingCart){
      return res.status(500).json({msg:'no cart found!'});
    }
    else if(req.body.quantity<=0){
      // console.log()
      const resp = cart.updateOne(
          { custId},
          { $pull: { "dishes": { "dish": req.body.dishId._id } } }
      );
      return res.status(200).json({resp, msg:'item quantity updated successfully!'});
    }
    await cart.updateOne({custId,"dishes.dish":req.body.dishId._id},{$set:{"dishes.$.quantity": req.body.quantity}});
    return res.status(200).json({msg:'item deleted successfully!'});
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  insertItemsToCart,
  viewCart,
  deleteCart,
  addItemToCart,
  updateItemQuantity,
  deleteItemFromCart,
};
