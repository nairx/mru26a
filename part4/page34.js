import express from "express";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
const app = express();
app.use(expressLayouts)
app.use(express.static("public"))
app.set("layout","layout")
app.set("view engine", "ejs");
app.set("views", "views");
app.listen(5000, () => console.log("Server Started"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "mySecretKey", // recommended to store in env file
    resave: false, // if true session is saved every request even if there is no change.
    saveUninitialized: false, //if true a default cookie gets created immediately
  }),
);

// app.use((req, res, next) => {
//   req.locals.user = req.session.user;
//   next();
// });

let users = [
  { name: "Poojitha", email: "poojitha@gmail.com", password: "1234" },
  { name: "Ajay", email: "ajay@gmail.com", password: "1234" },
  { name: "Komal", email: "komal@gmail.com", password: "1234" },
];



app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (user) {
    if (user.password === password) {
      req.session.user = user; //session id gets created, check in browser, inspect - application - cookies
      res.redirect("/");
    } else {
      res.render("login", { error: "Invalid Password" });
    }
  } else {
    res.render("login", { error: "User not found" });
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  users = [...users, req.body];
  res.redirect("/");
});

app.get("/", (req, res) => {
  if (req.session.user) {
    res.render("dashboard", { users });
  } else {
    res.redirect("/login");
  }
});
