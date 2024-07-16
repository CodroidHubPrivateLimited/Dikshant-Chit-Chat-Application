const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; // Same secret key as used above

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
