const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const authParent = require('../../middleware/auth-parent');

const Parent = require('../../models/Parent');
const Teacher = require('../../models/Teacher');

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
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, surname, email, password, children } = req.body;

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
        children,
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
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// GET api/parents
// Get all parents
router.get('/', async (req, res) => {
  try {
    const parents = await Parent.find();
    res.json(parents);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET api/parents/me
// Get current parent
router.get('/me', authParent, async (req, res) => {
  try {
    const id = req.parent.id;
    const parent = await Parent.findOne({ _id: id });

    res.json(parent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// PUT api/parents/me
// Update current parent
router.put('/me', authParent, async (req, res) => {
  try {
    const id = req.parent.id;

    const parent = await Parent.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    res.json(parent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// GET api/parents/:parent_id
// Get parent by ID
router.get('/:parent_id', async (req, res) => {
  try {
    const id = req.params.parent_id;
    const parent = await Parent.findOne({ _id: id });

    if (!parent) {
      return res.status(400).json({ msg: 'Globėjas nerastas' });
    }

    res.json(parent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
