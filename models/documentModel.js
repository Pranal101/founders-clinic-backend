import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, // Links the document to a user
  },
  profileType: {
    type: String,
    enum: ["InternProfile", "ProfessionalProfile", "EnterpriseProfile"], // Dynamically references profiles
  },
  documentType: {
    type: String,
    required: true,
  },
  documentName: { type: String, required: true }, // Name of the document
  documentUrl: { type: String, required: true }, // URL for accessing the document
  uploadDate: { type: Date, default: Date.now }, // Timestamp for when the document was uploaded
  additionalInfo: { type: String }, // Optional metadata or description
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
