const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // Add this line to import CORS
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/ping", (req, res) => {
  res.sendFile(__dirname + "/public/views/index.html");
});

// Body parser middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:3000", // This must be the origin of the client making the request
    credentials: true, // This allows the server to accept cookies from the client
  }),
);

// Connect to MongoDB
mongoose
  .connect(
    //change the connection string as per your mongodb setup
    "mongodb://username:password@localhost:27017/?authMechanism=DEFAULT",
    {
      dbName: "seller_app",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const adminRoute = require("./controller/admin");
const authRoute = require("./controller/auth");
const productRoute = require("./controller/product_details");
const salesRoute = require("./controller/sales");
const userRoute = require("./controller/user");
const urls = require("./urls");

// Use Routes
app.use("/", urls);
app.use("/api/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/sales", salesRoute);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
