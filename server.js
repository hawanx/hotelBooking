const express = require("express");
const app = express();
const parser = require("body-parser");
const db = require("./database/db");

app.use(parser.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/signup", async function (req, res) {
  try {
    var uname = req.body.unameR;
    var pass = req.body.passR;

    var name = req.body.nameR;
    var email = req.body.emailR;
    var phone = req.body.phoneR;
    var address = req.body.addressR;

    const results = await db.query(
      `select * from userLogin where $1 =uname or $2 = email or $3=phoneNo;`,
      [uname, email, phone]
    );

    if (
      uname.length == 0 ||
      pass.length == 0 ||
      address.length == 0 ||
      email.length == 0 ||
      phone.length == 0 ||
      name.length == 0
    ) {
        res.redirect("/failR");
    } else if (results.rowCount != 0) {
      res.redirect("/failR");
    } else {
      await db.query(
        "INSERT INTO userLogin(name,email,phoneno,address,uname,pass) VALUES($1,$2,$3,$4,$5,$6);",
        [name, email, phone, address, uname, pass]
      );

      console.log(uname, pass);
      res.redirect("/");
    }
  } catch (err) {
    console.log("error in postregister", err);
    res.status(404).json(err);
  }
});

app.post("/login", async function (req, res) {
  try {
    var uname = req.body.unameL;
    var pass = req.body.passL;

    const results = await db.query(
      `select * from userLogin where $1 =uname and $2 = pass;`,
      [uname, pass]
    );

    if (results.rowCount != 0) {
      res.redirect("/mainpage");
    } else res.redirect("/failL");

    console.log(uname, pass);
  } catch (err) {
    console.log("error in postlogin", err);
  }
});

app.post("/booking", async function (req, res) {
  try {
    const arrive = req.body.arrive;
    const depart = req.body.depart;
    const adultNo = req.body.adult;
    const childNo = req.body.child;
    const room = req.body.room;
    const dinner = req.body.dinner;
    const comments = req.body.comments;

    if (dinner == "dinner") {
      await db.query(
        `INSERT INTO booking(arrive,depart,adultNo,childrenno,roomtype,dinner,
            extraneeds) VALUES($1,$2,$3,$4,$5,$6,$7 );`,
        [arrive, depart, adultNo, childNo, room, "YES", comments]
      );
    } else {
      await db.query(
        `INSERT INTO booking(arrive,depart,adultNo,childrenno,roomtype,dinner,
        extraneeds) VALUES($1,$2,$3,$4,$5,$6,$7);`,
        [arrive, depart, adultNo, childNo, room, "NO", comments]
      );
    }
    console.log(arrive, depart, adultNo, childNo, room, dinner, comments);

    res.redirect("/succ");
  } catch (err) {
    console.log("error in booking", err);
  }

  res.end();
});

app.get("/mainpage", function (req, res) {
  res.sendFile(__dirname + "/views/mainpage.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/views/about.html");
});

app.get("/gallery", (req, res) => {
  res.sendFile(__dirname + "/views/gallery.html");
});

app.get("/services", (req, res) => {
  res.sendFile(__dirname + "/views/services.html");
});

app.get("/services", (req, res) => {
  res.sendFile(__dirname + "/views/services.html");
});

app.get("/book", (req, res) => {
  res.sendFile(__dirname + "/views/book.html");
});

app.get("/failL", (req, res) => {
  res.sendFile(__dirname + "/views/failL.html");
});

app.get("/failR", (req, res) => {
  res.sendFile(__dirname + "/views/failR.html");
});

app.get("/succ", (req, res) => {
  res.sendFile(__dirname + "/views/successbooking.html");
});

app.listen(3000, function () {
  console.log("Server is running");
});
