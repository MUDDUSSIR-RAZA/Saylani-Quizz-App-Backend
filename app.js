const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const http = require("http");

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

app.use(cors());

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/auth", auth);
app.use("/admin", admin);
app.use("/student", student);

// Create the server and set a timeout limit
const server = http.createServer(app);
server.timeout = 300000; // 300,000 milliseconds = 5 minutes

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
