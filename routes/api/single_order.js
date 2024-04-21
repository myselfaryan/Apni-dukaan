const express = require('express');
const router = express.Router();
const models = require('./models');
const cors = require('cors');

const app = express();
app.use(express.static('public'));

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

module.exports = router;

app.listen(3000, () => console.log('Server started on port 3000'));