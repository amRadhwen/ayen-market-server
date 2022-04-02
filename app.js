// import modules
const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

// import and configure env variables
require("dotenv").config();

// import and connect to database
require("./config/db").connectDB();

// express app
const app = express();

// middlewares
const { protectUser } = require("./middlewares/authMiddleware");
// app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/avatars", express.static(path.join(__dirname, "/public/upload/avatars")));
app.use("/products", express.static(path.join(__dirname, "/public/upload/products/")));
app.use("/posts", express.static(path.join(__dirname, "/public/upload/posts")));


// import routes
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const contactRoutes = require("./routes/contactRoutes");
const productRoutes = require("./routes/productRoutes");
const postRoutes = require("./routes/postRoutes");

// token verification
// must be checked eveytime user refresh the front page
// can also be checked using a timer interval
app.get("/api/token", protectUser, (req, res) => {
    res.status(200).json({token: req.headers.authorization.split(" ")[1]});
})

app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/product", productRoutes);
app.use("/api/post", postRoutes);


// render response to any required path
app.use("*", (req, res) => {
    res.send("<pre>API is running :)</pre>")
})


// api server port
const port = process.env.PORT || 5000;

// start server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})