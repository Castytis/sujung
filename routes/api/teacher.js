const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

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

    const { name, surname, email, password, subject, classes, info } = req.body;

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
