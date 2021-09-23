const bcrypt = require('bcrypt');
const { generateAccessToken, authenticateToken} = require('../middleware/validateToken');
const {restaurant, dish} = require('../models/data_model');

const createRestaurant = async (req, res) => {
    try {
      // Check if email already exists
      const checkRestaurant = await restaurant.findOne({
        where: { emailId: req.body.emailId },
      });
      if (checkRestaurant) {
        return res.status(409).json({
          error: "There's already an account with this email. Please sign in.",
        });
      }
      // Else create new restaurant
      req.body.passwd = await bcrypt.hash(req.body.passwd, 12); // crypt the password
      const rest = await restaurant.create(req.body);
      return res.status(201).json({
        rest,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

const loginRestaurant = async (req, res) => {
    try {
      const { emailId, passwd } = req.body;
      if (!emailId || !passwd) {
        return res.status(401).json({ error: 'Please input all fields!' });
      }
      const existingRest = await restaurant.findOne({
        where: { emailId },
      });
      if (!existingRest) {
        return res.status(404).json({ error: 'Email not found! Please register!' });
      }
      bcrypt.compare(passwd, existingRest.passwd, (err) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid password!' });
        }
        const token = generateAccessToken(existingRest.restId, 'restaurant');
        return res.status(200).json({ message: 'Login successful!', token });
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
    return null;
  };

module.exports = {
    createRestaurant,
    loginRestaurant,
};