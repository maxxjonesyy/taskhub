require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", require("./routes/register"));

db.once("open", () => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));
