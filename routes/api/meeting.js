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
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// Teacher & Parent
// GET api/meetings
// Get all meetings
router.get('/', [authTeacher, authParent], async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Get Teachers meetings
// GET api/meetings/me
// Get meetings by organiser
router.get('/me', authTeacher, async (req, res) => {
  try {
    const id = req.teacher.id;

    const meetings = await Meeting.find({ organiser: id });

    res.json(meetings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Teacher & Parent
// GET api/meetings/:meeting_id
// Get meeting by id
router.get('/:meeting_id', [authTeacher, authParent], async (req, res) => {
  try {
    const id = req.params.meeting_id;
    const meeting = await Meeting.findOne({ _id: id });

    if (!meeting) {
      return res.status(400).json({ msg: 'Susitikimas nerastas' });
    }

    res.json(meeting);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Teacher
// Delete api/meetings/:meeting_id
// Delete meeting
router.delete('/:meeting_id', authTeacher, async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.meeting_id);

    if (!meeting) {
      return res.status(404).json({ msg: 'Susitikimas nerastas' });
    }

    if (meeting.organiser.toString() !== req.teacher.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await meeting.remove();
    res.json({ msg: 'Susitikimas ištrintas' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
