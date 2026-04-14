const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Server running...");
});

// email route
app.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "New Inquiry",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.json({ message: "Email sent successfully ✅" });

  } catch (err) {
    console.log("MAIL ERROR:", err);
    res.json({ message: "Error sending email ❌" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});