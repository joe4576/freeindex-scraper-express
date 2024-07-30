import express from "express";
import cors from "cors";
import { load } from "cheerio";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const wrapWithErrorHandling = async <T = unknown>(
  fn: (...args: any[]) => Promise<T>,
  errorHandler: (error: unknown) => any
) => {
  try {
    return await fn();
  } catch (error: unknown) {
    console.error(error);
    return errorHandler(error);
  }
};

app.get("/freeindex/:profile", async (req, res) =>
  wrapWithErrorHandling(
    async () => {
      const profile = req.params.profile;
      const url = `https://www.freeindex.co.uk/${profile}`;

      const response = await fetch(url);
      const data = await response.text();

      const $ = load(data);
      const reviewsText = $("h2#reviewsTop").text();

      if (!reviewsText) {
        return res.status(404);
      }

      const numberOfReviews =
        reviewsText.split(" ")[0]?.replaceAll(",", "") ?? null;

      if (numberOfReviews === null) {
        return res
          .status(500)
          .json({ error: "Could not find number of reviews" });
      }

      res.status(200).json({ numberOfReviews: JSON.parse(numberOfReviews) });
    },
    (error) => res.status(500).json({ error })
  )
);

app.listen(port, () => {
  console.log(`FreeIndex scraper listening on port ${port}`);
});
