// import InternProfile from "../models/internProfile.js";
// import Job from "../models/Job.js";
// import ProfessionalProfile from "../models/professionalProfile.js";

// export const getInternMatchesForJobs = async (req, res) => {
//   try {
//     const { industries, location } = req.query; // Optional filters from frontend

//     const matchedInterns = await InternProfile.aggregate([
//       {
//         $lookup: {
//           from: "jobs", // Ensure the collection name matches the Job model
//           localField: "skills",
//           foreignField: "requirements",
//           as: "matchedJobs",
//         },
//       },
//       {
//         $match: {
//           ...(industries && {
//             preferredIndustries: { $in: industries.split(",") },
//           }),
//           ...(location && { "matchedJobs.location": location }),
//         },
//       },
//       {
//         $project: {
//           firstName: 1,
//           lastName: 1,
//           matchedJobs: {
//             title: 1,
//             description: 1,
//             location: 1,
//           },
//         },
//       },
//     ]);

//     res.status(200).json(matchedInterns);
//   } catch (error) {
//     console.error("Error fetching intern matches:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const getJobMatchesForIntern = async (req, res) => {
//   try {
//     const { userId } = req.params; // Get intern's userId from request params

//     const internProfile = await InternProfile.findOne({ userId });
//     if (!internProfile) {
//       return res.status(404).json({ message: "Intern profile not found" });
//     }

//     const matchedJobs = await Job.find({
//       requirements: { $in: internProfile.skills },
//       location: { $in: internProfile.preferredIndustries }, // Example filter
//     }).select("title description location");

//     res.status(200).json(matchedJobs);
//   } catch (error) {
//     console.error("Error fetching job matches:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
import InternProfile from "../models/internProfile.js";
import ProfessionalProfile from "../models/professionalProfile.js";
import Job from "../models/Job.js";

// Matches interns with jobs
export const getInternMatchesForJobs = async (req, res) => {
  try {
    const { industries, location } = req.query; // Optional filters from frontend

    const matchedInterns = await InternProfile.aggregate([
      {
        $lookup: {
          from: "jobs", // Ensure the collection name matches the Job model
          localField: "skills",
          foreignField: "requirements",
          as: "matchedJobs",
        },
      },
      {
        $match: {
          ...(industries && {
            preferredIndustries: { $in: industries.split(",") },
          }),
          ...(location && { "matchedJobs.location": location }),
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          matchedJobs: {
            title: 1,
            description: 1,
            location: 1,
          },
        },
      },
    ]);

    res.status(200).json(matchedInterns);
  } catch (error) {
    console.error("Error fetching intern matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Matches professionals with jobs
export const getProfessionalMatchesForJobs = async (req, res) => {
  try {
    const { industries, location } = req.query; // Optional filters from frontend

    const matchedProfessionals = await ProfessionalProfile.aggregate([
      {
        $lookup: {
          from: "jobs", // Ensure the collection name matches the Job model
          localField: "skills",
          foreignField: "requirements",
          as: "matchedJobs",
        },
      },
      {
        $match: {
          ...(industries && {
            preferredIndustries: { $in: industries.split(",") },
          }),
          ...(location && { "matchedJobs.location": location }),
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          matchedJobs: {
            title: 1,
            description: 1,
            location: 1,
          },
        },
      },
    ]);

    res.status(200).json(matchedProfessionals);
  } catch (error) {
    console.error("Error fetching professional matches:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Matches jobs for an individual intern
export const getJobMatchesForIntern = async (req, res) => {
  try {
    const { userId } = req.params;

    const internProfile = await InternProfile.findOne({ userId });
    if (!internProfile) {
      return res.status(404).json({ message: "Intern profile not found" });
    }

    const matchedJobs = await Job.find({
      requirements: { $in: internProfile.skills },
      location: { $in: internProfile.preferredIndustries },
    }).select("title description location");

    res.status(200).json(matchedJobs);
  } catch (error) {
    console.error("Error fetching job matches for intern:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Matches jobs for an individual professional
export const getJobMatchesForProfessional = async (req, res) => {
  try {
    const { userId } = req.params;

    const professionalProfile = await ProfessionalProfile.findOne({ userId });
    if (!professionalProfile) {
      return res
        .status(404)
        .json({ message: "Professional profile not found" });
    }

    const matchedJobs = await Job.find({
      requirements: { $in: professionalProfile.skills },
      location: { $in: professionalProfile.preferredIndustries },
    }).select("title description location");

    res.status(200).json(matchedJobs);
  } catch (error) {
    console.error("Error fetching job matches for professional:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
