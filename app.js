const express = require("express");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const cron = require('node-cron');

const auth = require("./routes/auth");
const product = require("./routes/product");
const blog = require("./routes/blog");

const app = express();
const { mongoose } = require("./model/connection");
const { verify } = require("./middleware/auth");
const { default: axios } = require("axios");
mongoose();

const public = path.join(process.cwd(), "public");

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(public));
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  credentials: true, // Allow credentials (cookies)
}));

app.set("view engine", "ejs");
app.set("views", "views");


//Handle Fake Request 
app.get("/", (req, res) => {
  res.send(" Fake Request | Server is alive");
});


// Keep-alive logic With Fake Request 
cron.schedule('*/10 * * * *', async () => {
  try {
      const response = await axios.get('https://sample-next-backend.onrender.com');
      console.log('Keep-alive ping successful:', response.status);
  } catch (error) {
      console.error('Error in keep-alive ping:', error.message);
  }
});

app.use("/auth", auth);
// app.use("/blog", blog);

app.listen(5000);
