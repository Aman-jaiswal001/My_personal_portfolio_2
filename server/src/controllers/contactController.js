import ContactMessage from "../models/ContactMessage.js";

export const postContactmessage = async (req, res ) => {
    try {
    const { name, email, mobile, subject, message } = req.body;

    if (!name || !email || !mobile || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    

    const savedMessage = await ContactMessage.create({ name, email, mobile, subject, message });
    return res.status(201).json({ message: 'Message saved successfully.', data: savedMessage });
  } catch (error) {
    return res.status(500).json({ message: 'Could not save contact message.', error: error.message });
  }
}