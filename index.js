// index.js (updated)
require("dotenv").config();

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const path = require("path");

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        httpOnly: true,
    },
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL || "http://localhost:3000/auth/github/callback",
      scope: ["user:email"],
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/auth/github", (req, res, next) => {
    const authUrl = passport._strategies.github._oauth2.getAuthorizeUrl({
      scope: ["user:email"],
      prompt: "login", // Forces GitHub to re-prompt for login
    });
    res.redirect(authUrl);
  });

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

app.get("/profile", ensureAuthenticated, (req, res) => {
  res.render("profile", { user: req.user });
});

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err); // Handle any errors during logout
      }
      req.session.destroy(function (err) {
        if (err) {
          return next(err); // Handle session destruction errors
        }
        res.redirect("/"); // Redirect after session is fully destroyed
      });
    });
  });

// Utility function
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});