const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const session = require("express-session");
const upload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

const users = require("./routes/Users");
const enquiries = require("./routes/Enquiry");
const property = require("./routes/Property");
const connectDB = require("./config/db");
connectDB();

app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(
  upload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB per file
  })
);
app.use(cors());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 300000 },
  })
);

//? API's
app.use("/api/users", users);
app.use("/api/enquiry", enquiries);
app.use("/api/property", property);
app.use("/api/test", (req, res) => {
  console.log("API TEST MESSAGE!!!");
  return res.status(200).send("API TEST MESSAGE!!!!");
});

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
