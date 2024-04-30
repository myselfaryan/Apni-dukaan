const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Add this line to import CORS
const path = require('path');



const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/ping', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html');
});

// Body parser middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // This must be the origin of the client making the request
    credentials: true, // This allows the server to accept cookies from the client
  }),
);

// Connect to MongoDB
mongoose.connect('mongodb+srv://shubh:Geeta%409569@cluster1.x2cdm2h.mongodb.net/', {
    dbName: 'Cluster1',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


const authRoute = require("./controller/auth");
const productRoute = require("./controller/product_details");
const salesRoute = require("./controller/sales");
const userRoute = require("./controller/user");
const urls = require("./urls");



// Use Routes
app.use("/", urls);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/sales", salesRoute);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
