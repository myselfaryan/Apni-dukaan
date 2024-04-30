const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    personal_contact_number: {
        type: String,
        required: true,
    },
    
    product_title: {
        type: String,
        required: true
    },
    product_desctiption: {
        type: String,
        required: true
    },
    manufacturer_name: {
        type: String,
        required: true
    },
    brand_name: {
        type: String,
        required: true
    },
    original_price: {
        type: Number,
        required: true
    },
    discount_percentage: {
        type: Number,
        required: true
    },
    draft_status: {
        type: String, // true for draft, false for published
        required: true
    },
    visibility: {
        type: String, // true for visible, false for hidden
        required: true
    },
    product_category: {
        type: String,
        required: true
    },
    stocks_available: {
        type: Number, // Changed to Number type
        required: true
    },
    // image_name: {
    //     type: String,
    //     required: true
    // },
    date: {
        type: String,
        default: () => new Date().toISOString().split('T')[0].replace(/-/g, '-')
    }
});

module.exports = Product = mongoose.model('product', ProductSchema);
