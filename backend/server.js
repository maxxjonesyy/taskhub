require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database/db");
const { escapeInputs, verifyAccessToken } = require("./middleware/middleware");

const PORT = process.env.PORT || 8080;
const app = express();

const allowedOrigins = [
  "http://localhost:5173", // Localhost 1
  "http://localhost:5174", // Localhost 2
  "https://taskhub-mj.netlify.app", // Production
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(escapeInputs);
app.use(cors(corsOptions));

app.use("/", require("./routes/authRoutes"));
app.use("/", verifyAccessToken, require("./routes/databaseRoutes"));

db.once("open", (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
