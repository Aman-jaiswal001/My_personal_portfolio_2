import Achievement from "../models/Achievement.js";
import ContactMessage from "../models/ContactMessage.js";
import Project from "../models/Project.js";
import imagekit from "../configs/imagekit.js";
import fs from "fs";

export const getLogin = (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (password !== adminPassword) {
    return res.status(401).json({ message: "Invalid admin password." });
  }

  return res.json({ token: "portfolio-admin" });
};

export const getContactMessage = async (req, res) => {
  try {
    const contacts = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not load contacts.", error: error.message });
  }
};

export const postAddPorject = async (req, res) => {
  try {
    const { title, description, live, code } = req.body;
    const media = req.file

    if (!title || !description || !live || !code || !req.file) {
      return res.status(400).json({
        message:
          "Project name, description, image, live link, and GitHub link are required.",
      });
    }
    let image = ''

    const fileBuffer = fs.readFileSync(media.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: media.originalname,
    });
    image = response.url;

    const project = await Project.create({
      title,
      description,
      live,
      code,
      image,
    });

    res.status(201).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not save project.", error: error.message });
  }
};

export const postAddachievements = async (req, res) => {
  try {
    const { title, issuer, description } = req.body;
    const image_file = req.files;

    if (!title || !issuer || !description || !req.files?.length) {
      return res.status(400).json({
        message:
          "Achievement name, issuer, description, and images are required.",
      });
    }
    let images = [];

    if (image_file.length) {
      images = await Promise.all(
        image_file.map(async (image) => {
          const fileBuffer = fs.readFileSync(image.path);
          const response = await imagekit.upload({
            file: fileBuffer,
            fileName: image.originalname,
            folder: "Achievements",
          });

          const url = imagekit.url({
            path: response.filePath,
            transformation: [
              { quality: "auto" },
              { format: "webp" },
              { width: "1280" },
            ]
          });
          return url;
        }),
      );
    }

    const achievement = await Achievement.create({
      title,
      issuer,
      description,
      images,
    });

    res.status(201).json(achievement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not save achievement.", error: error.message });
  }
};

export const deletePorject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject)
      return res.status(404).json({ message: "Project not found." });
    res.json({ message: "Project deleted successfully.", id: req.params.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not delete project.", error: error.message });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    const deletedAchievement = await Achievement.findByIdAndDelete(
      req.params.id,
    );
    if (!deletedAchievement)
      return res.status(404).json({ message: "Achievement not found." });
    res.json({
      message: "Achievement deleted successfully.",
      id: req.params.id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Could not delete achievement.", error: error.message });
  }
};
