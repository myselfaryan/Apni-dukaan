const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line to import CORS

const app = express();
const port = 3000;

// Body parser middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://127.0.0.1:5501', // This must be the origin of the client making the request
    credentials: true // This allows the server to accept cookies from the client
  }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://shubh:Geeta%409569@cluster1.x2cdm2h.mongodb.net/', {
    dbName: 'Cluster1',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


const authRoute = require('./routes/api/auth');
const productRoute = require('./routes/api/product_details');
const userRoute = require('./routes/api/user');
const salesRoute = require('./routes/api/sales');
// Use Routes
app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/user', userRoute);
app.use('/api/sales', salesRoute);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});



