const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mailgun = require('mailgun-js');
const bcrypt = require('bcryptjs');

const Teacher = require('../../models/Teacher');
const Parent = require('../../models/Parent');
const { findOne } = require('../../models/Teacher');

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MG_DOMAIN,
});

// PUT api/password/forgotpassword
// Send Email with reset link
router.put('/forgotpassword', async (req, res) => {
  const { email } = req.body;

  const teacher = await Teacher.findOne({ email });
  const parent = await Parent.findOne({ email });

  if (!teacher && !parent) {
    return res
      .status(400)
      .json({ error: 'Naudotojas su tokiu el. paštu neegzistuoja' });
  }

  if (teacher) {
    const token = jwt.sign(
      { _id: teacher._id },
      process.env.RESET_PASSWORD_KEY,
      { expiresIn: '30m' }
    );

    const data = {
      from: 'noreply@sujung.com',
      to: email,
      subject: 'Account reset link',
      html: `
        <h2>Click on link to reset password</h2>
        <p>${process.env.URL}/resetpassword/${token}</p>
        `,
    };

    const updated = await teacher.updateOne({ resetLink: token });

    if (!updated) {
      return res.status(400).json({ error: 'Reset failed' });
    }

    if (updated) {
      mg.messages().send(data, (error, body) => {
        if (error) {
          return res.json({
            error: 'failed',
          });
        }
        return res.json({ message: 'Email sent' });
      });
    }
  }
});

// PUT api/password/resetpassword
// Reset password
router.put('/resetpassword', async (req, res) => {
  const { resetLink, newPassword } = req.body;

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(newPassword, salt);

  let teacher = await Teacher.findOne({ resetLink });
  let parent = await Parent.findOne({ resetLink });

  if (!resetLink) {
    return res.status(401).json({ error: 'Auth error' });
  }

  if (teacher) {
    const result = jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY);

    if (result) {
      const obj = {
        password: password,
        resetLink: '',
      };

      teacher = _.extend(teacher, obj);
      await teacher.save();
      res.status(200).json({ message: 'pakeista' });
    }
  }
});

module.exports = router;