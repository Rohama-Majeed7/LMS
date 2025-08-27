import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    userId: {
      type: String,
      ref: "User",
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.models.Purchase || mongoose.model("Purchase", purchaseSchema);
export default Purchase
