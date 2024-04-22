const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../../models/product_details_model');
const UserAuth = require('../../models/user_auth_model');

router.get('/ping', (req, res) => {
    res.send('Namaste! Welcome to the products API.');
    console.log('Request at /');
});


// Set up multer with custom storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/product_images/')
    },
    filename: function (req, file, cb) {
        // Rename the file to the current timestamp
        cb(null, Date.now() + path.extname(file.originalname))
    },
    onError: function (err, next) {
        console.error(err);
        next(err);
    }
})

const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), async (req, res) => {
    console.log('Request at /add');

    // req.body contains the JSON data
    const data = req.body;

    // req.file contains the 'image' file
    const image = req.file;

    const user_auth_token = req.body.user_auth_token;
    let user_auth = await UserAuth.findOne({ user_auth_token });

    // Extract the product details from the JSON data
    const productId = data.productId ? data.productId : Date.now().toString();
    const productTitle = data.productTitle;
    const productDescription = data.productDescription;
    const manufacturerName = data.manufacturerName;
    const brand = data.brand;
    const originalPrice = data.originalPrice;
    const discountsPercentage = data.discountPercentage;
    const status = data.status;
    const visibility = data.visibility;
    const productCategory = data.productCategory;
    const stocksAvailable = data.stocksAvailable;

    console.log('data:', data);
    console.log('productTitle:', productTitle);
    console.log(discountsPercentage + typeof (discountsPercentage));
    console.log(productId)

    // Save the product details to the database
    try {
        const product = new Product({
            personal_contact_number: user_auth.personal_contact_number,
            product_id: productId,
            product_title: productTitle,
            product_desctiption: productDescription,
            manufacturer_name: manufacturerName,
            brand_name: brand,
            original_price: originalPrice,
            discount_percentage: discountsPercentage,
            draft_status: status,
            visibility: visibility,
            stocks_available: stocksAvailable,
            product_category: productCategory,
            image_name: image.filename
        });

        await product.save();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    // Return the image file name as response
    res.status(200).json({ message: "Product added successfully", status: "success", image: image.filename });
});

router.post('/get-products', upload.single('image'), async (req, res) => {
    console.log('Request at /add');
    const user_auth_token = req.body.user_auth_token;
    let user_auth = await UserAuth.findOne({ user_auth_token });
    if (user_auth) {
        let products = await Product.find({ personal_contact_number: user_auth.personal_contact_number });
        return res.status(200).json({ products: products, status: 'ok' });
    }else{
        return res.status(400).json({ msg: 'User not found', status: 'error' });
    }
});

router.get('/details', async (req, res) => {
    try {
        const productId = req.query.productId;
        const product = await Product.findOne({ product_id: productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product details retrieved successfully", product });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

