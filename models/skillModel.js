// import mongoose from "mongoose";

// const skillSchema = new mongoose.Schema(
//   {
//     skills: {
//       type: [String], // Array of skill names
//       required: true,
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// const Skill = mongoose.model("Skill", skillSchema);

// export default Skill;
import mongoose from "mongoose";

const userSkillSchema = new mongoose.Schema({
  uid: {
    type: String, // Unique user identifier
    required: true,
  },
  skills: {
    type: [String], // Skills specific to this user
    required: true,
    default: [],
  },
});

const skillSchema = new mongoose.Schema(
  {
    skills: {
      type: [String], // Array of all unique skills
      required: true,
      default: [],
    },
    userSkills: {
      type: [userSkillSchema], // Nested array of user-specific skills
      default: [],
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
