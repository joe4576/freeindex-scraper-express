import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World! With typescript without manual build");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
