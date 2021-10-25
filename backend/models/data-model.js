const { mongoDB } = require('../config/mongo.conf');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // poolSize: 500,
  // bufferMaxEntries: 0
};
const mongoosedb = mongoose.connect(mongoDB, options)

const customer = mongoose.model('customer', new Schema({
  emailId: {type: String, required: true, unique: true},
  passwd: {type: String, required: true},
  name: {type: String, required: true},
  contactNo: {type: String},
  city: {type: String},  
  state: {type: String},
  country: {type: String},
  about: {type: String},
  profileImg: {type: String},
  dob: {type: Date},
  nickName: {type: String}
},
{
  versionKey: false
}
));



const customerAddress = mongoose.model('customerAddress', new Schema({
  custId: {type: Schema.Types.ObjectId ,ref:'customer'},
  address: {type: String,unique: true}
},
{
  versionKey: false
}
));


const restaurant = mongoose.model('restaurant', Schema({
  emailId: {type: String, required: true, unique: true},
  passwd: {type: String, required: true},
  name: {type: String, required: true},
  contactNo: {type: String},
  city: {type: String},  
  state: {type: String},
  country: {type: String},
  address: {type: String},
  description: {type: String},
  profileImg: {type: String},
  startTime: {type: Date},
  endTime: {type: Date},
  deliveryType: {
    type: String,
    enum : ['Pickup', 'Delivery'],
    default: 'Delivery'
  },
  dietary: {
    type: String,
    enum : ['Veg','Non-veg','Vegan'],
    default: 'Non-veg'
}},
{
  versionKey: false
}
))


const custFavs = mongoose.model('custFavs', new Schema({
  custId: {type: Schema.Types.ObjectId ,ref:'customer'},
  restId: {type: Schema.Types.ObjectId ,ref:'restaurant'},
},
{
  versionKey: false
}
))

const dish = mongoose.model('dish', new Schema({
  name: {type: String, required: true},
  ingreds: {type: String},
  dishPrice: {type: Number},
  dishImg: {type: String},
  dishType: {type: String},
  category: {
    type: String,
    enum :  ['Appetizer', 'Salads,', 'Main Course','Desserts','Beverages'],
    default: 'Appetizer'
  },
  restId: {type: Schema.Types.ObjectId ,ref:'restaurant'},
},
{
  versionKey: false
}
))

const order = mongoose.model('order', new Schema({
  custId: {type: Schema.Types.ObjectId ,ref:'customer'},
  restId: {type: Schema.Types.ObjectId ,ref:'restaurant'},
  orderType: {
    type: String,
    enum : ['Delivery', 'Pickup'],
    default: 'Delivery'
  },
  orderStatus: {
    type: String,
    enum : [ 'Initialized', 'Placed', 'Preparing', 'Ready', 'On the way', 'Delivered', 'Pickup up', 'Cancelled'],
    default: 'Placed'
  },
  price: {type: Number},
  taxPrice: {type: Number},
  totalPrice: {type: Number},
  orderPlacedTime: {type: Date},
  orderAddress: {type: String},
  cartId: {type: Schema.Types.ObjectId ,ref:'cart'},
  orderNote: {type: String}
},
{
  versionKey: false
}
))

const cart = mongoose.model('cart', new Schema({
  custId: {type: Schema.Types.ObjectId ,ref:'customer'},
  restId: {type: Schema.Types.ObjectId ,ref:'restaurant'},
  dishes: [{
    dish: {type: Schema.Types.ObjectId, ref:'dish',unique:true}, 
    quantity: {type: Number}}]
},
{
  versionKey: false
}
))

// const orderDishes = mongoose.model('orderDishes', new Schema({
//   custId: {type: Schema.Types.ObjectId ,ref:'customer'},
//   restId: {type: Schema.Types.ObjectId ,ref:'restaurant'},
//   dish: {type: Schema.Types.ObjectId, ref:'dish'},
//   quantity: {type: Number}
// },
// {
//   versionKey: false
// }
// ))

module.exports = {
  mongoosedb,
  customer,
  customerAddress,
  restaurant,
  custFavs,
  // restaurantType,
  dish,
  // dishImages,
  order,
  // orderDishes,
  cart,
};
