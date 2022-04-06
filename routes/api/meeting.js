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
    const meetings = await Meeting.find().populate('organiser', ['name']);
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
    const meeting = await Meeting.findOne({ _id: id }).populate('organiser', [
      'name',
    ]);

    if (!meeting) {
      return res.status(400).json({ msg: 'Susitikimas nerastas' });
    }

    res.json(meeting);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// Teacher & Parent
// GET api/meetings/participating/me
// Get Meetings user is participating
router.get('/participating/me', [authTeacher, authParent], async (req, res) => {
  let teacher;
  let parent;

  try {
    // Meetings for teacher
    if (req.teacher) {
      teacher = req.teacher.id;
      const meetings = await Meeting.find({
        'participants.teachers.teacher': teacher,
      });

      if (!meetings) {
        return res.status(400).json({ msg: 'Susitikimų nėra' });
      }

      res.json(meetings);
    }

    // Meetings for parents
    if (req.parent) {
      parent = req.parent.id;
      const meetings = await Meeting.find({
        'participants.parents.parent': parent,
      });

      if (!meetings) {
        return res.status(400).json({ msg: 'Susitikimų nėra' });
      }

      res.json(meetings);
    }
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

// Teacher & Parent
// Put api/meetings/participate/:meeting_id
// Participate in meeting
router.put(
  '/participate/:meeting_id',
  [authTeacher, authParent],
  async (req, res) => {
    let participantParent;
    let participantTeacher;

    try {
      const meeting = await Meeting.findById(req.params.meeting_id);

      // Participant is teacher
      if (req.teacher) {
        participantTeacher = req.teacher.id;

        if (
          meeting.participants.teachers.filter((participant) => {
            return participant.teacher.toString() === participantTeacher;
          }).length > 0
        ) {
          return res.status(400).json({ msg: 'Jau dalyvaujate susitikime' });
        }

        meeting.participants.teachers.push({ teacher: participantTeacher });
        await meeting.save();
      }

      // Participant is parent
      if (req.parent) {
        participantParent = req.parent.id;

        if (
          meeting.participants.parents.filter((participant) => {
            return participant.parent.toString() === participantParent;
          }).length > 0
        ) {
          return res.status(400).json({ msg: 'Jau dalyvaujate susitikime' });
        }

        meeting.participants.parents.push({ parent: participantParent });
        await meeting.save();
      }

      res.json(meeting.participants);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// Teacher & Parent
// Put api/meetings/leave/:meeting_id
// Leave meeting
router.put(
  '/leave/:meeting_id',
  [authTeacher, authParent],
  async (req, res) => {
    let participantParent;
    let participantTeacher;

    try {
      const meeting = await Meeting.findById(req.params.meeting_id);

      // Teacher is leaving
      if (req.teacher) {
        participantTeacher = req.teacher.id;

        if (
          meeting.participants.teachers.filter((participant) => {
            return participant.teacher.toString() === participantTeacher;
          }).length === 0
        ) {
          return res.status(400).json({ msg: 'Nesate susitikimo dalyvis' });
        }

        const teacherIndex = meeting.participants.teachers
          .map((participant) => {
            return participant.teacher.toString();
          })
          .indexOf(participantTeacher);
        meeting.participants.teachers.splice(teacherIndex, 1);
        await meeting.save();
      }

      // Parent is leaving
      if (req.parent) {
        participantParent = req.parent.id;

        if (
          meeting.participants.parents.filter((participant) => {
            return participant.parent.toString() === participantParent;
          }).length === 0
        ) {
          return res.status(400).json({ msg: 'Nesate susitikimo dalyvis' });
        }

        const parentIndex = meeting.participants.parents
          .map((participant) => {
            return participant.parent.toString();
          })
          .indexOf(participantParent);

        meeting.participants.parents.splice(parentIndex, 1);
        await meeting.save();
      }

      res.json(meeting.participants);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
