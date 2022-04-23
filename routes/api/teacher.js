const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authTeacher = require('../../middleware/auth-teacher');
const authParent = require('../../middleware/auth-parent');

const Teacher = require('../../models/Teacher');

// POST api/teachers
// Register teacher
router.post(
  '/',
  [
    body('name', 'Įveskite savo vardą').not().isEmpty(),
    body('surname', 'Įveskite savo pavardę').not().isEmpty(),
    body('email', 'Įveskite savo el. paštą').isEmail(),
    body(
      'password',
      'Slaptažodis turi būti netrumpesnis nei 6 simboliai'
    ).isLength({ min: 6 }),
    body('subject', 'Įveskite mokamąjį dalyką').not().isEmpty(),
    body('classes', 'Įveskite priklausančias klases').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, email, password, subject, classes, info, number } =
      req.body;

    try {
      let teacher = await Teacher.findOne({ email: email });

      if (teacher) {
        return res.status(400).json({
          errors: [{ msg: 'Mokytojas su tokiu el. paštu jau egzistuoja' }],
        });
      }

      teacher = new Teacher({
        name,
        surname,
        email,
        password,
        subject,
        classes,
        info,
        number,
      });

      const salt = await bcrypt.genSalt(10);

      teacher.password = await bcrypt.hash(password, salt);

      await teacher.save();

      const payload = {
        teacher: {
          id: teacher.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.status(201).json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

// GET api/teachers
// Get all teachers
router.get('/', authTeacher, authParent, async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// GET api/teachers/me
// Get current teacher
router.get('/me', authTeacher, async (req, res) => {
  try {
    const id = req.teacher.id;
    const teacher = await Teacher.findOne({ _id: id });

    res.json(teacher);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT api/teachers/me
// Update current teacher
router.put('/me', authTeacher, async (req, res) => {
  try {
    const id = req.teacher.id;

    const teacher = await Teacher.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    res.json(teacher);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET api/teachers/:teacher_id
// Get teacher by ID
router.get('/:teacher_id', authParent, authTeacher, async (req, res) => {
  try {
    const id = req.params.teacher_id;
    const teacher = await Teacher.findOne({ _id: id });

    if (!teacher) {
      return res.status(400).json({ msg: 'Mokytojas nerastas' });
    }

    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
