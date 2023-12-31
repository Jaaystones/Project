const User = require('../Models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendEmail = require('./sendMail');
const asyncHandler = require('express-async-handler');

//Function to generate code to send email
function generateSixDigitNumber() {
  const min = 100000; // Minimum 6-digit number (100000)
  const max = 999999; // Maximum 6-digit number (999999)
  const randomBytes = crypto.randomBytes(4); // 4 bytes = 32 bits
  const randomNumber = min + Math.floor((randomBytes.readUInt32BE(0) / 0x100000000) * (max - min + 1));
  return randomNumber;
}

const createUser = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, loginPassword } = req.body;

    if (!email || !firstName || !lastName || !loginPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      return res.status(409).json({ message: "User has already been registered" });
    }

    if (loginPassword.length < 6) {
      return res.status(403).json({ message: "Password must not be less than 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(loginPassword, 10);

    // Generate a 6-digit authentication code
    const token = generateSixDigitNumber().toString();
    const hashedToken = await bcrypt.hash(token, 10);
    console.log(token);

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      authToken: { token: hashedToken, expiry: expirationDate },
      loginPassword: hashedPassword,
    });

    await newUser.save();
    res.status(200).json(newUser);

    const loginUrl = `${process.env.CLIENT_URL}/authenticate/${token}`;

    const message = `
     <h2>Hello ${email}</h2>
     <p>Your authentication code is: ${token}</p>
     <p>This code is valid for only 24 hours.</p>
     <a href=${loginUrl} clicktracking=off>${loginUrl}</a>
     <p>Regards...</p>
     <p>Power Pulse Team</p>
   `;
    const subject = "Authentication Code";
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;

    await sendEmail(subject, message, send_to, sent_from);

    res.status(200).json({ message: 'User created and email sent' });
  } catch (error) {
    console.error('Error while creating user:', error);
    res.status(500).json({ message: 'Failed to create user or send email' });
  }
});

module.exports = { createUser };
