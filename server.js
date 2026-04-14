const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
  res.send("Server running...");
});

app.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "dinesh.dinnu2010@gmail.com",
      subject: "New Inquiry - Dhanya Global Exports",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.json({ message: "Email sent successfully ✅" });

  } catch (error) {
    console.log(error);
    res.json({ message: "Error sending email ❌" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});