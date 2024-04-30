const express = require('express');
const router = express.Router();
const models = require('./models');
const cors = require('cors');
const path = require('path');
const Product = require('../models/product_details_model');
const UserAuth = require('../models/user_auth_model');

const app = express();
app.use(express.static('public'));

const multer = require("multer");
const upload = multer();

app.use(cors({
  origin: 'http://127.0.0.1:5501'
}));

// Get order details by order ID
router.get('/order', async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await models.Order.findOne({
      where: { order_id: orderId },
      include: [
        {
          model: models.Customer,
          attributes: ['name', 'email', 'phone', 'shipping_address', 'billing_address'],
        },
        {
          model: models.Payment,
          attributes: ['transaction_id', 'payment_method', 'card_number', 'cardholder_name'],
        },
        {
          model: models.OrderItem,
          include: [
            {
              model: models.Product,
              attributes: ['id', 'name', 'price'],
            },
          ],
        },
        {
          model: models.Logistics,
          attributes: ['tracking_number', 'provider_name', 'provider_email', 'charge'],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/product-image", upload.none(), async (req, res) => {
  console.log("Request at /product-image");
  try {
    const user_auth_token = req.body.user_auth_token;
    let user_auth = await UserAuth.findOne({ user_auth_token });
    if (!user_auth) {
      return res.status(404).json({ message: "User not found" });
    }
    let user_details = await UserDetails.findOne({
      personal_contact_number: user_auth.personal_contact_number,
    });
    if (!user_details) {
      return res.status(404).json({ message: "User details not found" });
    }
    const imagePath = path.join(
      __dirname,
      "../uploads/profile_images/",
      user_details.profile_image_id,
    );
    res.sendFile(imagePath);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

app.listen(3000, () => console.log('Server started on port 3000'));