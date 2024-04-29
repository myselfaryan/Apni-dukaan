const { ObjectId } = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    product_id:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    personal_contact_number:{
        type:String,
        required:true,

    },
    product_title: {
        type: String, 
        required:true,
        
    },
    original_price: {
        type: Number,
        required: true
    },
    ordered_on: {
        type: Date,
        default: Date.now
    },
    Payment_method: {
        type: String,
        enum: ['UPI', 'Debit card', 'Credit card'],
        required: true
    },
    delivery_status: {
        type: Boolean,
        enum: [true, false],
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;