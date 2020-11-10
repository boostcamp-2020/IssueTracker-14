const passport = require("passport");
const { Strategy: JwtStrategy } = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");

const { user: UserModel } = require("../db/models");
const { Strategy: GithubStrategy } = require("passport-github");

require("dotenv").config();

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const JWTVerify = async (jwt_payload, done) => {
  try {
    const user = await UserModel.findOne({
      where: { id: jwt_payload.id },
    });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

const githubConfig = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/user/oauth/github/callback"
      : "http://115.85.183.106:3000/api/user/oauth/github/callback",
};

const githubLoginVerify = async (accessToken, refreshToken, profile, done) => {
  try {
    const {
      _json: { node_id, id, login, avatar_url },
    } = profile;

    const [githubUser] = await UserModel.findOrCreate({
      where: {
        nickname: login,
      },
      defaults: {
        email: `${id}@github.com`,
        nickname: login,
        password: node_id,
        imageurl: avatar_url,
        provider: "github",
      },
    });

    return done(null, githubUser);
  } catch (error) {
    return done(error);
  }
};

module.exports = () => {
  passport.use("jwt", new JwtStrategy(JWTConfig, JWTVerify));
  passport.use("github", new GithubStrategy(githubConfig, githubLoginVerify));
};
