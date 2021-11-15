const { Router } = require('express');

const {
  customerController,
  restaurantController,
  orderController,
  cartController,
} = require('../controllers');

const {
  customerRegistrationValidationRules,
  restaurantRegistrationValidationRules,
  dishValidationRules,
  validate,
  orderValidationRules,
  customerAddressValidationRules,
} = require('../controllers/valdiationRules');
const { auth } = require('../utils/passport');

const router = Router();

auth();
// Root route
router.get('/', (req, res) => res.send('This is root!'));

// Register and Login routes
router.post(
  '/register/customers',
  customerRegistrationValidationRules(),
  validate,
  customerController.createCustomer,
);
router.post(
  '/register/restaurants',
  restaurantRegistrationValidationRules(),
  validate,
  restaurantController.createRestaurant,
);
router.post('/login/customers', customerController.loginCustomer);
router.post(
  '/login/restaurants',
  restaurantController.loginRestaurant,
);

router.get('/customers/:custId', customerController.getCustomer);
router.post('/customers/favourites/:custId', customerController.setCustomerFavourites);
router.get('/customers/favourites/:custId', customerController.getCustomerFavourites);
router.put('/customers/:custId', customerController.updateCustomer);
router.delete(
  '/customers/:_id',
  customerController.deleteCustomer,
);

// Restaurant routes
router.get('/restaurants', restaurantController.getRestaurants);
router.get(
  '/restaurants/:restId',
  restaurantController.getRestaurant,
);
router.put(
  '/restaurants/:restId',
  restaurantController.updateRestaurant,
);
router.delete(
  '/restaurants/:restId',
  restaurantController.deleteRestaurant,
);
router.get('/customers/city/:city', customerController.getAllCustomerRestaurants);
router.get(
  '/restaurants/search/:searchquery',
  restaurantController.searchRestaurants,
);

// Restaurant Dishes routes
router.post(
  '/restaurants/:restId/dishes',
  dishValidationRules(),
  validate,
  restaurantController.createDish,
);
router.get(
  '/restaurants/:restId/dishes',
  restaurantController.getRestaurantDishes,
);
router.get(
  '/restaurants/:restId/dishes/:dishId',
  restaurantController.getRestaurantDish,
);
router.put(
  '/restaurants/:restId/dishes/:dishId',
  restaurantController.updateRestaurantDish,
);
router.delete(
  '/restaurants/:restId/dishes/:dishId',
  restaurantController.deleteRestaurantDish,
);

// Cart routes
router.post('/customers/:custId/cart', cartController.insertItemsToCart);
router.get('/customers/:custId/cart', cartController.viewCart);
router.put('/customers/:custId/cart/:dishId', cartController.addItemToCart);
router.put('/customers/:custId/updatecart', cartController.updateItemQuantity);
router.delete('/customers/:custId/deletecart', cartController.deleteCart);
router.post('/customers/:custId/deleteitem/:dishId', cartController.deleteItemFromCart);

// Order routes
router.post(
  '/customers/:custId/orders/init',
  orderController.initOrder,
);
// router.post(
//   '/customers/:custId/orders/create',
//   orderValidationRules(),
//   validate,
//   orderController.createOrder,
// );
// router.get('/customers/:custId/latestOrder', orderController.getLatestOrder);
router.get(
  '/customers/:custId/orders/:orderId',
  orderController.getOrderDetailsById,
);
router.get(
  '/restaurants/:restId/orders',
  orderController.getRestaurantOrders,
);
router.get(
  '/customers/:custId/orders',
  orderController.getCustomerOrders,
);
router.put(
  '/restaurants/:restId/updateorder',
  orderController.updateOrder,
);

// Customer addresses
router.post(
  '/customers/:custId/addresses',
  customerAddressValidationRules(),
  validate,
  customerController.addCustomerAddress,
);
router.get(
  '/customers/:custId/addresses',
  customerController.getCustomerAddresses,
);

module.exports = router;
