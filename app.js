if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes");
const errHandling = require("./middleware/errHandler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errHandling);

app.listen(port, () => {
  console.log(`Tsuki-Server running on port ${port}`);
});
