// index.js

require("dotenv").config(); // Load environment variables

const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const csrf = require("csurf");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const path = require("path");

const app = express();

// View engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// Flash and CSRF middleware
app.use(flash());
const csrfProtection = csrf({ cookie: false });
app.use(csrfProtection);

// Make csrfToken available to EJS views
app.use((req, res, next) => {
  if (typeof req.csrfToken === 'function') {
    res.locals.csrfToken = req.csrfToken();
  } else {
    res.locals.csrfToken = null;
  }
  next();
});

// Passport GitHub OAuth
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  res.send("Login successful!");
});

app.get("/auth/github", passport.authenticate("github", {
  scope: ["user:email"],
  prompt: "login"
}));

app.get("/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
    res.redirect("/profile");
  }
);
app.get("/profile", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.redirect("/login");
  }

  res.render("profile", { user: req.user });
});

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
