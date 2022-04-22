const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {

    let token = req.headers.authorization || '';
    if (token.startsWith('Bearer ')) {
        token = token.substring(7);
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'token missing or invalid'
    });
  } else {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: 'token missing or invalid'
        });
      }
      req.decoded = decoded;
      next();
    });
  }
}

module.exports = {
    isAuthenticated
}