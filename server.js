const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running On Port ${process.env.PORT}`);
});