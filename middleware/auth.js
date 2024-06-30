const jwt = require('jsonwebtoken');
const { findUser } = require('../controllers/auth');
require("dotenv").config();

exports.verify = async (req, res, next) => {
  try {
    const token = req.headers.cookie;
    const decoded = await verifyToken(token);

    
    req.id = decoded.userId;
    req.email = decoded.email;

    const user = await findUser(req.email);

    if (!user) {
      console.log("Authorization UnSuccessful!");
      res.status(400).json("Authorization UnSuccessful!");
      return;
    }
    next();
  } catch (err) {
    res.status(401).json("Unauthorized");
  }
};

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}