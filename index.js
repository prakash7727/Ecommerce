// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import authRoutes from "./Routes/auth.js";
// import morgan from "morgan";
// import categoryRoutes from "./Routes/category.js";
// import productRoutes from "./Routes/product.js";
// import cors from "cors";
// import path from "path";

// dotenv.config(); 

// //const express = require("express");
// // console.log("process =>", process);

// const app = express();

// //db connections
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log("DB error =>", err));

//   //middlewere
//   app.use(cors());
//   app.use(morgan("dev"));
//   app.use(express.json());


//   //router middlewere
//   app.use("/api",authRoutes);
//   app.use("/api",categoryRoutes);
//   app.use("/api",productRoutes);


//  app.get("/",(req, res) => {
//   app.use(express.static(path.resolve(__dirname, "client", "build")));
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//  })

// // app.get("/users", (req, res) => {
// //   res.json({
// //     data: "prakash suthar sanchore",
// //   });
// // });

// const port = process.env.PORT || 8000;

// app.listen(port, () => {
//   console.log(`Node server is running on port ${port}`);
// });
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./Routes/auth.js";
import morgan from "morgan";
import categoryRoutes from "./Routes/category.js";
import productRoutes from "./Routes/product.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config(); 

const app = express();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// DB connections
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error =>", err));

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Router middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

// Serve static files
app.use(express.static(path.resolve(__dirname, "client", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Define port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});
