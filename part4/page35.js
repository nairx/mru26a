import express from "express";
const app = express();
const productRouter = express.Router();
const userRouter = express.Router();
productRouter.get("/list", (req, res) => {
  res.send("Product List");
});
userRouter.get("/list", (req, res) => {
  res.send("User list");
});
app.use("/products", productRouter);
app.use("/users", userRouter);
app.listen(5000, () => console.log("Server started"));
