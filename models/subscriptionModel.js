import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  userType: {
    type: String,
  },
  type: {
    type: String,
    required: true, // Subscription type, e.g., Basic, Premium
  },
  price: {
    type: Number,
    required: true, // Price of the subscription
  },
  duration: {
    type: String,
    required: true, // e.g., "1 month", "1 year"
  },
  features: {
    type: [String], // List of features included in the subscription
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for creation
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
