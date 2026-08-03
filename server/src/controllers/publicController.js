import Achievement from "../models/Achievement.js";
import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not load projects.", error: error.message });
  }
};

export const getAchievments = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not load achievements.", error: error.message });
  }
};
