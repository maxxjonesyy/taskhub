require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const app = express();
app.use(cors());

db.run()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => {
    console.log(`Error starting server: ${error}`);
  });
