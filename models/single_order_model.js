const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  shipping_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  billing_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cardholder_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const OrderItem = sequelize.define('OrderItem', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Payment = sequelize.define('Payment', {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  card_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiration_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  provider_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Logistics = sequelize.define('Logistics', {
  logistics_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tracking_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provider_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  charge: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Define associations
Customer.hasMany(Order);
Order.belongsTo(Customer);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

Order.hasOne(Payment);
Payment.belongsTo(Order);

Order.hasOne(Logistics);
Logistics.belongsTo(Order);

module.exports = {
  Customer,
  Product,
  Order,
  OrderItem,
  Payment,
  Logistics,
  sequelize,
};