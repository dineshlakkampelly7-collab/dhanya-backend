const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Email route
app.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // IMPORTANT for Render
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Inquiry - Dhanya Global Exports",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
`
    });

    res.json({ message: "Email sent successfully ✅" });

  } catch (error) {
    console.log("ERROR:", error);
    res.json({ message: "Error sending email ❌" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});