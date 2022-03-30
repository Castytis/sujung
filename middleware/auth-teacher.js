const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(404).json({ msg: 'Not Authorized' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.teacher = decoded.teacher;
    next();
  } catch (error) {
    res.status(404).json({ msg: 'Not Authorized' });
  }
};

module.exports = auth;
