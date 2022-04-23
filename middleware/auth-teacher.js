const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Not Authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.teacher = decoded.teacher;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Not Authorized' });
  }
};

module.exports = auth;
