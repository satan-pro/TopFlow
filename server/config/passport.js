const passport  = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
require('dotenv').config();

// User logs in through GitHub Oauth using this function
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
        let user = await User.findOne({githubId: profile.id});

        if(!user) {
            user = new User({
                username: profile.username,
                email: profile.emails ? profile.emails[0].value: "",
                password: "",
                githubId: profile.id,
                created_at: new Date(),
                profile: {
                    name: profile.displayName || "",
                    bio: profile._json.bio || "",
                    avatar_url: profile.photos[0]?.value || "",
                },
                refreshToken: refreshToken || "",
                accessToken: accessToken || "",
            });

            await user.save();
        }
        else {
            // Update user profile if it exists
            user.githubId = profile.id;
            user.profile.name = profile.displayName || user.profile.name;
            user.profile.bio = profile._json.bio || user.profile.bio;
            user.profile.avatar_url = profile.photos[0]?.value || user.profile.avatar_url;
            user.refreshToken = refreshToken || user.refreshToken;
            user.accessToken = accessToken || user.accessToken;
  
            await user.save();
          }

        return done(null, {id: profile.id, username: profile.username, accessToken: accessToken});
    }
    catch(err) {
        return done(err, null);
    }
  }
));

// Add the user's GitHub Id to the express-session
passport.serializeUser((user, done) => {
    done(null, {id: user.id, accessToken: user.accessToken});
});

// Whenever user data is retrieved from the session this is used
// It finds the user details from the database by querying the user id
passport.deserializeUser(async function(obj, done) {
    try {
        const user = await User.findOne({githubId: obj.id});

        if(user) {
            done(null, {...user.toObject(), accessToken: obj.accessToken});
        }
        else {
            done(null, false);
        }
    }
    catch(err) {
        done(err, null);
    }
});

module.exports = passport;

