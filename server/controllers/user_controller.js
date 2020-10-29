const { user: UserModel } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");

const signup = async (req, res) => {
  try {
    const { email, nickname, password1, password2 } = req.body;
    const checkPassword = password1 === password2;
    const bcryptPassword = bcrypt.hashSync(password1);
    const isExist = await UserModel.findOne({ where: { email } });

    if (isExist) {
      return res.status(409).json({ message: "fail" });
    }

    if (checkPassword) {
      try {
        await UserModel.create({
          email,
          nickname,
          password: bcryptPassword,
          provider: "local",
        });
        return res.status(201).json({ message: "success" });
      } catch (error) {
        return res.status(409).json({ message: "fail" });
      }
    }
    if (!checkPassword) {
      return res.status(400).json({ message: "fail" });
    }
  } catch (error) {
    console.log(error);
  }
};

const localLogin = async (req, res) => {
  try {
    const { email, nickname, password: inputPassword } = req.body;
    const identifier = email ? { email } : { nickname };
    const currentUser = await UserModel.findOne({
      where: identifier,
    });
    console.log(currentUser);
    const compareResult = bcrypt.compareSync(
      inputPassword,
      currentUser.password
    );

    if (!compareResult) {
      return res.status(400).json({ message: "fail" });
    }

    if (compareResult) {
      const jwtoken = getToken({
        id: currentUser.id,
        email,
        nickname: currentUser.nickname,
      });
      return res.status(201).json({ message: "success", token: jwtoken });
    }
  } catch (error) {
    console.log(error);
  }
};

const githubLogin = (req, res) => {
  try {
    const { email, nickname, id } = req.user;
    const jwtoken = getToken({ id, email, nickname });
    return res.status(201).json({ message: "success", token: jwtoken });
  } catch (error) {
    console.log(error);
  }
};

const appleLogin = async (req, res) => {
  try {
    const { email, name, hashcode } = req.body;
    const [appleUser] = await UserModel.findOrCreate({
      where: { email },
      defaults: {
        email: email,
        password: hashcode,
        nickname: name,
        provider: "apple",
      },
    });
    const jwtoken = getToken({
      id: appleUser.id,
      nickname: appleUser.nickname,
      email: appleUser.email,
    });
    return res.status(201).json({ message: "success", token: jwtoken });
  } catch (error) {
    console.log(error);
  }
};

const getToken = ({ id, nickname, email }) => {
  const payloadObj = {
    id,
    email,
    nickname,
  };
  return jwt.sign(payloadObj, process.env.JWT_SECRET_KEY);
};

module.exports = { signup, localLogin, githubLogin, appleLogin };
