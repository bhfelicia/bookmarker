const { Bookmark, Category, syncAndSeed } = require("./db.js");
const homepageHtml = require("./views/homePage");
const bookmarkList = require("./views/bookmarkList");
const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

app.get("/", (req, res) => res.redirect("/categories"));

app.get("/categories", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(homepageHtml(categories));
  } catch (error) {
    next(error);
  }
});

app.get("/categories/:id", async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.findAll({
      where: {
        categoryId: req.params.id,
      },
      include: [Category],
    });
    res.send(bookmarkList(bookmarks));
  } catch (error) {
    next(error);
  }
});

app.post("/categories", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

const PORT = 3000;

const init = async () => {
  try {
    await syncAndSeed();
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
