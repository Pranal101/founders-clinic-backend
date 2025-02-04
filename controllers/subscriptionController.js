import Subscription from "../models/subscriptionModel.js";

export const createSubscription = async (req, res) => {
  const { userType, image, type, priceINR, priceUSD, duration, features } =
    req.body;

  try {
    const subscription = new Subscription({
      image,
      type,
      priceINR,
      priceUSD,
      duration,
      features,
      userType,
    });

    await subscription.save();

    res.status(201).json({
      message: "Subscription package created successfully",
      subscription,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();

    res.status(200).json({
      message: "All subscription packages retrieved successfully",
      subscriptions,
    });
  } catch (error) {
    console.error("Error retrieving subscriptions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findByIdAndDelete(id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({
      message: "Subscription package deleted successfully",
      subscription,
    });
  } catch (error) {
    console.error("Error deleting subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Controller for fetching subscriptions for Enterprise users
export const getEnterpriseSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userType: "enterprise" });

    res.status(200).json({
      message: "Enterprise subscriptions retrieved successfully",
      subscriptions,
    });
  } catch (error) {
    console.error("Error retrieving enterprise subscriptions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Controller for fetching subscriptions for Intern users
export const getInternSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userType: "intern" });

    res.status(200).json({
      message: "Intern subscriptions retrieved successfully",
      subscriptions,
    });
  } catch (error) {
    console.error("Error retrieving intern subscriptions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Controller for fetching subscriptions for Professional users
export const getProfessionalSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userType: "professional" });

    res.status(200).json({
      message: "Professional subscriptions retrieved successfully",
      subscriptions,
    });
  } catch (error) {
    console.error("Error retrieving professional subscriptions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
