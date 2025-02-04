import Events from "../models/Events.js";
import NetworkingCommunity from "../models/networkingCommunity.js";

// 1. Create an Event
export const createEvent = async (req, res) => {
  try {
    const {
      eventTitle,
      hostName,
      companyName,
      email,
      contactNumber,
      websiteUrl,
      country,
      city,
      completeAddress,
      eventLocation,
      venueName,
      venueAddress,
      eventLink,
      eventType,
      eventTypeOther,
      eventTheme,
      description,
      keyObjectives,
      presenters,
      topicsPlanned,
      targetAudience,
      targetAudienceOther,
      expectedNumberOfAttendees,
      prerequisites,
      eventStartDate,
      eventEndDate,
      startTime,
      endTime,
      recurringEvent,
      recurringEventOther,
      eventRecording,
      registrationRequired,
      registrationLink,
      registrationProcess,
      eventFeeBool,
      eventFee,
      discountsBool,
      discounts,
      sponsorsBool,
      sponsorsList,
      seekingSponsors,
      eventPromotion,
      eventPromotionOther,
      promotionalVideoBool,
      promotionalVideo,
    } = req.body;

    // Get the authenticated user's ID from the request
    const userId = req.user.uid;

    // Find the networking community profile linked to this user
    const networkingCommunity = await NetworkingCommunity.findOne({ userId });

    if (!networkingCommunity) {
      return res.status(404).json({
        message:
          "Networking community profile not found. Please try logging in.",
      });
    }

    // Create the event with the communityId from the found profile
    const newEvent = new Events({
      userId,
      eventTitle,
      hostName,
      companyName,
      email,
      contactNumber,
      websiteUrl,
      country,
      city,
      completeAddress,
      eventLocation,
      venueName,
      venueAddress,
      eventLink,
      eventType,
      eventTypeOther,
      eventTheme,
      description,
      keyObjectives,
      presenters,
      topicsPlanned,
      targetAudience,
      targetAudienceOther,
      expectedNumberOfAttendees,
      prerequisites,
      eventStartDate,
      eventEndDate,
      startTime,
      endTime,
      recurringEvent,
      recurringEventOther,
      eventRecording,
      registrationRequired,
      registrationLink,
      registrationProcess,
      eventFeeBool,
      eventFee,
      discountsBool,
      discounts,
      sponsorsBool,
      sponsorsList,
      seekingSponsors,
      eventPromotion,
      eventPromotionOther,
      promotionalVideoBool,
      promotionalVideo,
      isApproved: false,
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({
      message: "Event created successfully",
      event: savedEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// 2. Get Approved Events (For Networking Community)
export const getEvents = async (req, res) => {
  try {
    // Get the authenticated user's ID
    const userId = req.user.uid;

    // Find the networking community profile for this user
    const networkingCommunity = await NetworkingCommunity.findOne({ userId });

    if (!networkingCommunity) {
      return res.status(404).json({
        message:
          "Networking community profile not found. Please complete your profile.",
      });
    }

    // Fetch events for this networking community
    const events = await Events.find({
      userId: userId,
      isApproved: true, // Ensure only approved events are fetched
    });

    res.status(200).json({
      message: "Events fetched successfully",
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//3.Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const deletedEvent = await Events.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event deleted successfully",
      event: deletedEvent,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//4. Get event by ID
export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find event by ID and populate necessary fields if required
    const event = await Events.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event fetched successfully",
      event,
    });
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// Controller to fetch all networking community profiles
export const getAllNetworkingCommunities = async (req, res) => {
  try {
    const networkingCommunities = await NetworkingCommunity.find();
    res.status(200).json({ success: true, data: networkingCommunities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all approved events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find({ isApproved: true }); // Fetch only approved events
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};
