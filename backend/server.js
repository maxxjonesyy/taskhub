require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database/db");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: "1kb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1kb" }));

app.use(cors());

app.use("/", require("./routes/login"));
app.use("/", require("./routes/register"));

db.once("open", (error) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
