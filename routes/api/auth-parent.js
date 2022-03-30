const express = require('express');
const router = express.Router();
const authParent = require('../../middleware/auth-parent');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { body, validationResult } = require('express-validator');

const Parent = require('../../models/Parent');

// GET api/auth-teacher
// Get authenticated teacher
router.get('/', authParent, async (req, res) => {
  try {
    const parent = await Parent.findById(req.parent.id).select('-password');
    res.json(parent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// POST api/auth-parent
// Login parent
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
      let parent = await Parent.findOne({ email: email });

      if (!parent) {
        return res.status(400).json({
          errors: [
            { msg: 'Mokinio globėjas su šiais prisijungimais neegzistuoja' },
          ],
        });
      }

      const isEqual = await bcrypt.compare(password, parent.password);

      if (!isEqual) {
        return res.status(400).json({
          errors: [
            { msg: 'Mokinio globėjas su šiais prisijungimais neegzistuoja' },
          ],
        });
      }

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
