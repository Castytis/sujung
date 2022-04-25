const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Nesate autorizuotas' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.parent = decoded.parent;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Nesate autorizuotas' });
  }
};

module.exports = auth;
