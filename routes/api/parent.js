const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const Parent = require('../../models/Parent');

// POST api/parents
// Register parent
router.post(
  '/',
  [
    body('name', 'Įveskite savo vardą.').not().isEmpty(),
    body('surname', 'Įveskite savo pavardę.').not().isEmpty(),
    body('email', 'Įveskite savo el. paštą').isEmail(),
    body(
      'password',
      'Slaptažodis turi būti netrumpesnis nei 6 simboliai'
    ).isLength({ min: 6 }),
    body('childName', 'Įveskite vaiko vardą ir pavardę.').not().isEmpty(),
    body('childSurname', 'Įveskite vaiko vardą ir pavardę.').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, email, password, childName, childSurname } =
      req.body;

    try {
      let parent = await Parent.findOne({ email: email });

      if (parent) {
        return res.status(400).json({
          errors: [
            { msg: 'Vaiko globėjas su tokiu el. paštu jau egzistuoja.' },
          ],
        });
      }

      parent = new Parent({
        name,
        surname,
        email,
        password,
        childName,
        childSurname,
      });

      const salt = await bcrypt.genSalt(10);

      parent.password = await bcrypt.hash(password, salt);

      await parent.save();

      const payload = {
        parent: {
          id: parent.id,
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
