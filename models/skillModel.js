import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    skills: {
      type: [String], // Array of skill names
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
