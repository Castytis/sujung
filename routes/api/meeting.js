const express = require('express');
const router = express.Router();

// GET api/meetings
// Get teachers
router.get('/', (req, res) => {
  res.send('meeting route');
});

module.exports = router;
