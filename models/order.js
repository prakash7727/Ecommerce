import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;


const orderSchema = new Schema({
      products: [{ type: ObjectId, ref: "Product"}],
      payment: {},
      buyer: {type: ObjectId, ref: "User"},
      status: { type: String, default: "Not proccessed", enum: [
            "Not proccessed", "Processing", "Shipped", "Delivered", "Cancelled"
      ] }
},
{ timestamps: true}
)

export default mongoose.model("Order", orderSchema)