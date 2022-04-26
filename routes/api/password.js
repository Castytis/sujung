const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mailgun = require('mailgun-js');
const bcrypt = require('bcryptjs');

const Teacher = require('../../models/Teacher');
const Parent = require('../../models/Parent');

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
      .json({ msg: 'Naudotojas su tokiu el. paštu neegzistuoja' });
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
      return res.status(400).json({
        msg: 'Slaptažodžio atkūrimas nepavyko, bandykite dar karta',
      });
    }

    if (updated) {
      mg.messages().send(data, (error, body) => {
        if (error) {
          return res.status(400).json({
            msg: 'Slaptažodžio atkūrimas nepavyko, bandykite dar karta',
          });
        }
        return res.json({
          msg: 'Slaptažodžio atkūrimo nuoroda išsiųsta sėkmingai',
        });
      });
    }
  }

  if (parent) {
    const token = jwt.sign(
      { _id: parent._id },
      process.env.RESET_PASSWORD_KEY,
      { expiresIn: '30m' }
    );

    const data = {
      from: 'noreply@sujung.com',
      to: email,
      subject: 'Slaptažodžio keitimo nuoroda',
      html: `
          <h2>Slaptažodžio keitimo nuoroda</h2>
          <p>${process.env.URL}/resetpassword/${token}</p>
          `,
    };

    const updated = await parent.updateOne({ resetLink: token });

    if (!updated) {
      return res.status(400).json({
        msg: 'Slaptažodžio atkūrimas nepavyko, bandykite dar karta',
      });
    }

    if (updated) {
      mg.messages().send(data, (error, body) => {
        if (error) {
          return res.json({
            msg: 'Slaptažodžio atkūrimas nepavyko, bandykite dar karta',
          });
        }
        return res.json({
          msg: 'Slaptažodžio atkūrimo nuoroda išsiųsta sėkmingai',
        });
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

  const result = jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY);
  if (!result) {
    return res.status(401).json({
      msg: 'Slaptažodžio atkūrimo nuoroda neteisinga arba nebegalioja',
    });
  }
  if (result) {
    const obj = {
      password: password,
      resetLink: '',
    };

    if (teacher) {
      teacher = _.extend(teacher, obj);
      await teacher.save();
      res.status(200).json({ msg: 'Slaptažodis pakeistas sėkmingai' });
    }

    if (parent) {
      parent = _.extend(parent, obj);
      await parent.save();
      res.status(200).json({ msg: 'Slaptažodis pakeistas sėkmingai' });
    }
  }
});

module.exports = router;
