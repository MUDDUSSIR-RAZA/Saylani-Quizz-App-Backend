const jwt = require('jsonwebtoken');
const User = require('../model/db/user');
require("dotenv").config();

exports.verify = async (req, res, next) => {
  try {
    const token = req.query.token;

    if (!token) {
      res.status(400).json("Authorization UnSuccessful!");
      return;
    }

    const decoded = await verifyToken(token);
    const user = await User.findById(decoded.userId)
    req.userId = decoded.userId;

    if (!user) {
      res.status(400).json("User Not Found!");
      return;
    }
    else if (decoded.role != "student") {
      res.status(400).json("Unauthorized User!");
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