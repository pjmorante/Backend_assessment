const { response } = require("express");

const validateToken = (req, res = response, next) => {

    let token = req.headers.authorization || '';
    if (token.startsWith('Bearer ')) {
        token = token.substring(7);
    }
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'token missing or invalid'
      });
      try {
          const { id, name } = jwt.verify(token, process.env.SECRET);
          req.id = id;
          req.name = name;
      } catch (error) {
          res.status(401).json({
            success: false,
            message: 'token missing or invalid'
        });
      }
    }

    next();
}
module.exports = {
    validateToken
}