const express = require('express');
const router = express.Router();

// GET api/parents
// Get parents
router.get('/', (req, res) => {
  res.send('parent route');
});

module.exports = router;
