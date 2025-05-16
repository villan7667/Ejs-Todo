const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 

let items = [];

app.get("/", function (req, res) {
  res.render("list", { ejes: items });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  if (item && item.trim() !== "") {
    items.push(item.trim());
  }
  res.redirect("/");
});

app.listen(8000, function () {
  console.log("Server is running on port 8000");
});
