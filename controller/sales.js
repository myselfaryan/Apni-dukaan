const express = require('express');
const router = express.Router();
const Order = require('../models/order_details_model');
const UserAuth = require('../models/user_auth_model');
const Product = require('../models/product_details_model');

const multer = require('multer');
const upload = multer();


router.post('/add_order', async (req, res) => {
    console.log('Request at /add');

    const data = req.body;
    const productId = data.product_id;

    try {
        
        const userAuth = await UserAuth.findOne({ personal_contact_number: data.personal_contact_number });

        if (!userAuth) {
            return res.status(400).json({ message: "User authentication not found", status: "error" });
        }

        
        const product = await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(400).json({ message: "Product not found", status: "error" });
        }

        const order = new Order({
            product_id: product._id,
            personal_contact_number: userAuth.personal_contact_number,
            product_title: product.product_title, 
            original_price: product.original_price,
            ordered_on: Date.now(),
            Payment_method: data.Payment_method,
            delivery_status: data.delivery_status,
            name:data.name,
            email:data.email,
            shipping_address:data.shipping_address,
            billing_address:data.billing_address,
            quantity: data.quantity,
            product_count: data.product_count,
            total_earning: data.total_earning,
            total_order: data.total_order,
            unit_left: data.unit_left
        });

        await order.save();
       
        return res.status(200).json({ message: "Order added successfully", status: "success" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});


router.post('/get-orders',upload.none(), async (req, res) => {
    console.log('Request at /get-orders');

    const user_auth_token = req.body.user_auth_token;
    console.log("token"+user_auth_token);
    try {
        const user_auth = await UserAuth.findOne({ user_auth_token });

        if (!user_auth) {
            return res.status(400).json({ msg: 'User not found', status: 'error' });
        }
        
        const products = await Order.find({ personal_contact_number: user_auth.personal_contact_number });

        return res.status(200).json({ products: products, status: 'ok' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

router.post('/get-orders-details',upload.none(), async (req, res) => {
    console.log('Request at /get-orders');

    const user_auth_token = req.body.user_auth_token;
    console.log("token"+user_auth_token);
    try {
        const user_auth = await UserAuth.findOne({ user_auth_token });

        if (!user_auth) {
            return res.status(400).json({ msg: 'User not found', status: 'error' });
        }
        
        const products = await Order.find({ personal_contact_number: user_auth.personal_contact_number });

        return res.status(200).json({ products: products, status: 'ok' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});
module.exports = router;
