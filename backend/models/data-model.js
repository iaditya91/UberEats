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
  profileImg: {type: Date},
  startTime: {type: String},
  endTime: {type: String},
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

// const restaurant = sequelize.define('restaurant', {
//   restId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   emailId: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   passwd: {
//     type: Sequelize.TEXT,
//     allowNull: false,
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   contactNo: {
//     type: Sequelize.STRING,
//   },
//   city: {
//     type: Sequelize.STRING,
//   },
//   state: {
//     type: Sequelize.STRING,
//   },
//   address: {
//     type: Sequelize.STRING,
//   },
//   description: {
//     type: Sequelize.STRING,
//   },
//   profileImg: {
//     type: Sequelize.STRING,
//   },
//   startTime: {
//     type: Sequelize.TEXT,
//   },
//   endTime: {
//     type: Sequelize.TEXT,
//   },
//   deliveryType: {
//     type: Sequelize.ENUM,
//     values: ['Pickup', 'Delivery'],
//   },
//   dietary: {
//     type: Sequelize.ENUM,
//     values: ['Veg', 'Non-veg', 'Vegan'],
//   },
// });

// const custFavs = sequelize.define('custFavs', {
//   custFavId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
// });

// customer.hasMany(custFavs, {
//   foreignKey: 'custId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// custFavs.belongsTo(customer, {
//   foreignKey: 'custId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// restaurant.hasMany(custFavs, {
//   foreignKey: 'restId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// custFavs.belongsTo(restaurant, {
//   foreignKey: 'restId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// const restaurantType = sequelize.define('restaurantType', {
//   restTypeId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   restType: {
//     type: Sequelize.ENUM,
//     values: ['Veg', 'Non-veg', 'Vegan'],
//   },
// });

// restaurant.hasMany(restaurantType, {
//   foreignKey: 'restId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// restaurantType.belongsTo(restaurant, {
//   foreignKey: 'restId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// const dish = sequelize.define('dish', {
//   dishId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   ingreds: {
//     type: Sequelize.STRING,
//   },
//   dishPrice: {
//     type: Sequelize.FLOAT,
//   },
//   description: {
//     type: Sequelize.STRING,
//   },
//   dishImg: {
//     type: Sequelize.STRING,
//   },
//   dishType: {
//     type: Sequelize.STRING,
//   },
//   category: {
//     type: Sequelize.ENUM,
//     values: ['Appetizer', 'Salads,', 'Main Course','Desserts','Beverages'],
//   },
// });

// restaurant.hasMany(dish, {
//   foreignKey: 'restId',
//   onDelete: 'cascade',
//   onUdpate: 'cascade',
// });

// dish.belongsTo(restaurant, {
//   foreignKey: 'restId',
//   onDelete: 'cascade',
//   onUdpate: 'cascade',
// });

// const dishImages = sequelize.define('dishImages', {
//   dishImageId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   imageLink: {
//     type: Sequelize.STRING,
//   },
// });

// dish.hasMany(dishImages, {
//   foreignKey: 'dishId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// dishImages.belongsTo(dish, {
//   foreignKey: 'dishId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// const order = sequelize.define('order', {
//   orderId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   orderType: {
//     type: Sequelize.ENUM,
//     values: ['Delivery', 'Pickup'],
//   },
//   orderStatus: {
//     type: Sequelize.ENUM,
//     values: [
//       'Initialized',
//       'Placed',
//       'Preparing',
//       'Ready',
//       'On the way',
//       'Delivered',
//       'Pickup up',
//       'Cancelled',
//     ],
//   },
//   price: {
//     type: Sequelize.FLOAT,
//   },
//   taxPrice: {
//     type: Sequelize.FLOAT,
//   },
//   totalPrice: {
//     type: Sequelize.FLOAT,
//   },
//   orderPlacedTime: {
//     type: Sequelize.DATE,
//   },
//   orderAddress: {
//     type: Sequelize.STRING,
//   },
// });

// customer.hasMany(order, {
//   foreignKey: 'custId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// order.belongsTo(customer, {
//   foreignKey: 'custId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// restaurant.hasMany(order, {
//   foreignKey: 'restId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// order.belongsTo(restaurant, {
//   foreignKey: 'restId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// const cart = sequelize.define('cart', {
//   cartId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
// });

// customer.hasMany(cart, {
//   foreignKey: 'custId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// cart.belongsTo(customer, {
//   foreignKey: 'custId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// restaurant.hasMany(cart, {
//   foreignKey: 'restId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// cart.belongsTo(restaurant, {
//   foreignKey: 'restId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// dish.hasMany(cart, {
//   foreignKey: 'dishId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// cart.belongsTo(dish, {
//   foreignKey: 'dishId',
//   onUpdate: 'cascade',
//   onDelete: 'cascade',
// });

// const orderDishes = sequelize.define('orderDishes', {
//   orderDishesId: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
// });

// order.hasMany(orderDishes, {
//   foreignKey: 'orderId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// orderDishes.belongsTo(order, {
//   foreignKey: 'orderId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// dish.hasMany(orderDishes, {
//   foreignKey: 'dishId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

// orderDishes.belongsTo(dish, {
//   foreignKey: 'dishId',
//   onDelete: 'cascade',
//   onUpdate: 'cascade',
// });

module.exports = {
  mongoosedb,
  customer,
  customerAddress,
  restaurant,
  custFavs,
  // restaurantType,
  // dish,
  // dishImages,
  // order,
  // orderDishes,
  // cart,
};
