const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");

const auth = require("./routes/auth");
const admin = require("./routes/admin");
const student = require("./routes/student");

const app = express();
const { mongoose } = require("./model/connection");
const { verify } = require("./middleware/auth");
const { default: axios } = require("axios");
mongoose();

const public = path.join(process.cwd(), "public");

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(public));

const allowedOrigins = [
  "http://localhost:3000",
  "https://saylani-quizz-app.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // If you need to send cookies or other credentials
};

app.use(cors(corsOptions));

app.set("view engine", "ejs");
app.set("views", "views");


app.use("/auth", auth);
app.use("/admin", admin )
app.use("/student" , student)
// app.use("/blog", blog);

app.listen(5000);
