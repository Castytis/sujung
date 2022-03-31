const express = require('express');
const router = express.Router();
const authParent = require('../../middleware/auth-parent');
const authTeacher = require('../../middleware/auth-teacher');
const { body, validationResult } = require('express-validator');

const Meeting = require('../../models/Meeting');
const Teacher = require('../../models/Teacher');
const Parent = require('../../models/Parent');

// Teacher
// POST api/meetings
// Create a meeting
router.post(
  '/',
  [
    authTeacher,
    [
      body('title', 'Įveskite susitikimo pavadinimą').not().isEmpty(),
      body('subject', 'Įveskite susitikimo tikslą').not().isEmpty(),
      body('date', 'Įveskite susitikimo datą ir laiką').not().isEmpty(),
      body('location', 'Įveskite susitikimo vietą').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, subject, date, location, text } = req.body;

    try {
      const id = req.teacher.id;

      const newMeeting = new Meeting({
        organiser: id,
        title,
        subject,
        date,
        location,
        text,
      });

      const meeting = await newMeeting.save();
      res.json(meeting);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
