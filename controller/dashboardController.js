
// const express = require('express');
// const router = express.Router();


// const Order = require('../models/order_details_model');




// // Get total orders
// exports.getTotalOrders = async (req, res) => {
//   try {
//     const totalOrders = await Order.countDocuments();
//     res.json({ totalOrders });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch total orders' });
//   }
// };

// // Get total earnings
// exports.getTotalEarnings = async (req, res) => {
//   try {
//     const totalEarnings = await Order.aggregate([
//       { $group: { _id: null, total: { $sum: '$total_amount' } } },
//     ]);
//     res.json({ totalEarnings: totalEarnings[0]?.total || 0 });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch total earnings' });
//   }
// };

// // Get total customers
// exports.getTotalCustomers = async (req, res) => {
//   try {
//     const totalCustomers = await Customer.countDocuments();
//     res.json({ totalCustomers });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch total customers' });
//   }
// };








// // Route to fetch total orders
// router.get('/api/total-orders', async (req, res) => {
//   try {
//     const totalOrders = await Order.countDocuments();
//     res.json({ totalOrders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch total orders' });
//   }
// });

// // Route to fetch total earnings
// router.get('/api/total-earnings', async (req, res) => {
//   try {
//     const totalEarnings = await Order.aggregate([
//       { $group: { _id: null, total: { $sum: '$total_amount' } } },
//     ]);
//     res.json({ totalEarnings: totalEarnings[0]?.total || 0 });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch total earnings' });
//   }
// });

// // Route to fetch total customers
// router.get('/api/total-customers', async (req, res) => {
//   try {
//     const totalCustomers = await Customer.countDocuments();
//     res.json({ totalCustomers });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch total customers' });
//   }
// });

// module.exports = router;


// dashboardController.js
// dashboardController.js
// dashboardController.js
// const OrderDetails = require('../models/order_details_model');

// exports.getDashboardData = async (req, res) => {
//   try {
//     const totalOrders = await OrderDetails.countDocuments();
//     const totalProducts = await OrderDetails.aggregate([
//       { $group: { _id: null, total: { $sum: '$no_of_products' } } },
//     ]);
//     const totalEarnings = await OrderDetails.aggregate([
//       { $group: { _id: null, total: { $sum: '$price' } } },
//     ]);

//     res.json({
//       totalOrders,
//       totalProducts: totalProducts[0]?.total || 0,
//       totalEarnings: totalEarnings[0]?.total || 0,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch dashboard data' });
//   }
// };
