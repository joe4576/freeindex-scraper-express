import express from "express";
import cors from "cors";
import { load } from "cheerio";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World! With typescript without manual build");
});

app.get("/freeindex/:profile", async (req, res) => {
  const profile = req.params.profile;
  const url = `https://www.freeindex.co.uk/${profile}`;

  const response = await fetch(url);
  const data = await response.text();

  const $ = load(data);
  const reviewsText = $("h2#reviewsTop").text();

  console.log({ reviewsText });

  if (!reviewsText) {
    return res.status(404);
  }

  const numberOfReviews =
    reviewsText.split(" ")[0]?.replaceAll(",", "") ?? null;

  if (numberOfReviews === null) {
    return res.status(500).json({ error: "Could not find number of reviews" });
  }

  res.status(200).json({ numberOfReviews });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
