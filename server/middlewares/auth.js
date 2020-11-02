const passport = require("passport");

const isAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error) {
      console.log(error);
      return next(error);
    }
    if (!user) {
      return res.status(400).json({
        message: "error",
        error: "UNAUTHORIEZED_USER",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { isAuth };
