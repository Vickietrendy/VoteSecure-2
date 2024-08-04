const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
require('dotenv').config(); // Load environment variables from .env file

const users = [
  {
    id: 1,
    username: 'user',
    password: '$2a$10$V9DP.h/Q8C6KqF6j/BV6/u3Wj9J8b9xN1o6KsJELDbMZyyXephxJK', // hashed password for 'password'
    googleId: null
  }
];

// Debug logging to ensure environment variables are loaded
console.log('Google Client ID:', process.env.GOOGLE_CLIENT_ID);
console.log('Google Client Secret:', process.env.GOOGLE_CLIENT_SECRET);

passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = users.find(user => user.username === username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  }
));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  let user = users.find(user => user.googleId === profile.id);
  if (user) {
    return done(null, user);
  } else {
    user = {
      id: users.length + 1,
      username: profile.displayName,
      password: null,
      googleId: profile.id
    };
    users.push(user);
    return done(null, user);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
    
passport.deserializeUser((id, done) => {
  const user = users.find(user => user.id === id);
  done(null, user);
});

module.exports = passport;
