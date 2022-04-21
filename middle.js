const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const withAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.uid = decoded.uid;
        next();
      }
    });
  }
}

module.exports = withAuth;