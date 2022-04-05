const express = require('express');
const router = express.Router();
const authTeacher = require('../../middleware/auth-teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { body, validationResult } = require('express-validator');

const Teacher = require('../../models/Teacher');

// GET api/auth-teacher
// Get authenticated teacher
router.get('/', authTeacher, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.teacher.id).select('-password');
    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// POST api/auth-teacher
// Login teacher
router.post(
  '/',
  [
    body('email', 'Įveskite savo el. paštą').isEmail(),
    body('password', 'Įveskite slaptažodį').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let teacher = await Teacher.findOne({ email: email });

      if (!teacher) {
        return res.status(400).json({
          errors: [{ msg: 'Mokytojas su šiais prisijungimais neegzistuoja' }],
        });
      }

      const isEqual = await bcrypt.compare(password, teacher.password);

      if (!isEqual) {
        return res.status(400).json({
          errors: [{ msg: 'Mokytojas su šiais prisijungimais neegzistuoja' }],
        });
      }

      const payload = {
        teacher: {
          id: teacher.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
