import ProfessionalProfile from "../models/professionalProfile.js";

export const deleteEducation = async (req, res) => {
  const { userId, educationId } = req.body;
  console.log(userId);
  console.log(educationId);
  if (!userId || !educationId) {
    return res
      .status(400)
      .send({ error: "User ID and Education ID are required" });
  }

  try {
    const updatedProfile = await ProfessionalProfile.findOneAndUpdate(
      { userId },
      { $pull: { educationBackground: { _id: educationId } } },
      { new: true } // Return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).send({ error: "User profile not found" });
    }

    res.status(200).send({
      message: "Education entry deleted successfully",
      updatedProfile,
    });
  } catch (error) {
    res.status(500).send({
      error: "Error deleting education entry",
      details: error.message,
    });
  }
};
export const deleteExperience = async (req, res) => {
  const { userId, experienceId } = req.body;

  if (!userId || !experienceId) {
    return res
      .status(400)
      .send({ error: "User ID and Experience ID are required" });
  }

  try {
    const updatedProfile = await ProfessionalProfile.findOneAndUpdate(
      { userId },
      { $pull: { workExperience: { _id: experienceId } } },
      { new: true } // Return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).send({ error: "User profile not found" });
    }

    res.status(200).send({
      message: "Experience entry deleted successfully",
      updatedProfile,
    });
  } catch (error) {
    res.status(500).send({
      error: "Error deleting experience entry",
      details: error.message,
    });
  }
};
// Controller to fetch all professionals
export const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await ProfessionalProfile.find();
    res.status(200).json({ success: true, data: professionals });
  } catch (error) {
    console.error("Error fetching professionals:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
