"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cheerio_1 = require("cheerio");
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Hello World! With typescript without manual build");
});
app.get("/freeindex/:profile", async (req, res) => {
    const profile = req.params.profile;
    const url = `https://www.freeindex.co.uk/${profile}`;
    const response = await fetch(url);
    const data = await response.text();
    const $ = (0, cheerio_1.load)(data);
    const reviewsText = $("h2#reviewsTop").text();
    console.log({ reviewsText });
    if (!reviewsText) {
        throw new Error("Could not find reviews");
    }
    const numberOfReviews = reviewsText.split(" ")[0]?.replaceAll(",", "") ?? null;
    if (numberOfReviews === null) {
        throw new Error("Could not find number of reviews");
    }
    res.send({
        statusCode: 200,
        body: {
            numberOfReviews,
        },
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
