const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post("/send", async (req, res) => {
  try {
    console.log("ENV EMAIL:", process.env.EMAIL); // DEBUG
    console.log("ENV PASS:", process.env.PASS ? "EXISTS" : "MISSING");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    const { name, email, message } = req.body;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Inquiry",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.json({ message: "Email sent successfully ✅" });

  } catch (error) {
    console.log("ERROR:", error);
    res.json({ message: "Error sending email ❌" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});