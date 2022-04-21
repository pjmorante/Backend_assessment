const jwt = require('jsonwebtoken');

const getJWT = (id, name) => {

  return new Promise((resolve, reject) => {

    const payload = { id, name };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("There is not token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  getJWT,
};