import { Schema, model } from "mongoose";

const PaymentSchema = new Schema({
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["Credit Card", "Debit Card", "PayPal", "UPI", "Cash"] },
    transactionId: { type: String, unique: true, required: true }, // Unique Transaction ID
    status: { type: String, required: true, enum: ["Paid", "Failed", "Pending"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
});

const Payment = model("Payment", PaymentSchema);

export default Payment;
