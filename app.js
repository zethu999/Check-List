// getting requried modules [Express, bodyparser, ejs, mongoose] and date file.
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

// setting up express app and starting ejs templating engine.
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// setting up MongoDB database with schema and itemcollection using mongoose.
mongoose.connect("mongodb://127.0.0.1:27017/checklistDB", {
  useNewUrlParser: true,
});
const schema = new mongoose.Schema({
  name: String,
});
const itemCollection = mongoose.model("item", schema);

// adding default items to itemscollection.
const item1 = new itemCollection({
  name: "Buy vegetables",
});
const item2 = new itemCollection({
  name: "Call mom",
});
const item3 = new itemCollection({
  name: "Prepare presentation",
});

defaultItems = [item1, item2, item3];

/* Home route [get request]

    - sends index.html file when app starts. 

*/
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

/* add route [get request], first triggerd at index.html with get started button

    - finds the items in database
        -if (database is empty)
            - adds defaultItems to the database and redirects itself.
        -else
            - renders checklist.ejs file with title and items found in database.

*/
app.get("/add", function (req, res) {
  // get date and day
  const day = date.getDate();
  // find the items in database
  itemCollection
    .find()
    .then(function (foundItems) {
      console.log(foundItems);
      if (foundItems.length === 0) {
        itemCollection
          .insertMany(defaultItems)
          .then(function () {
            console.log("Successfully saved defult items to DB");
          })
          .catch(function (err) {
            console.log(err);
          });
        res.redirect("/add");
      } else {
        res.render("checklist", { listTitle: day, newListItems: foundItems });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

/* add route [post request], every time triggerd at checklist.ejs with + button

    - gets the new item by post request
    - saves new item to database
    - redirects to add route (get request) to display added item.

*/
app.post("/add", function (req, res) {
  const itemName = req.body.newItem;

  const item = new itemCollection({
    name: itemName,
  });
  item.save();
  res.redirect("/add");
});

/* delete route [post request], every time triggerd at checklist.ejs with checkbox

    - gets the checked item Id by post request
    - finds and deletes checked item from database
    - redirects to add route (get request) to display modified items list.

*/

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  console.log(checkedItemId);

  itemCollection
    .findByIdAndRemove(checkedItemId)
    .then(function () {
      console.log("Successfully deletd item from DB");
      res.redirect("/add");
    })
    .catch(function (err) {
      console.log(err);
    });
});


/* update route [post request], every time triggerd at checklist.ejs with + button

    - gets the updated itemId by post request
    - saves updated item to database
    - redirects to add route (get request) to display added item.

*/
app.post("/update/:itemId", function (req, res) {
  const itemId = req.params.itemId;
  const updatedItemName = req.body.editedItem;

  itemCollection
    .findByIdAndUpdate(itemId, { name: updatedItemName }, { new: true })
    .then(function (updatedItem) {
      console.log("Successfully updated item in DB -- " + updatedItem.name);
      res.redirect("/add");
    })
    .catch(function (err) {
      console.log(err);
    });
});


app.listen(5000, function () {
  console.log("Server started on port 5000.");
});
