const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const UserController = {};

UserController.register = async (req, res, next) => {
    console.log(req.body);
  const { username, mobile, dateofbirth, password } = req.body;
 
    let user = await User.findOne({ mobile: mobile });
    if (user) {
      res.status(400);
      return res.send({ error: "User already exists" });
    }
    const newUser = new User({
      username,
      mobile,
      dateofbirth,
      password,
    });
    try {
    user = await newUser.save();
    return  res.status(200).send({
      username: user.username,
      id: user._id,
    });
  } catch (err) {
    res.status(500);
    console.log(err.errors);
    return res.send({ error: "server error "+err.message });
  }
};
UserController.getUser = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200);
    return res.send(users);
  } catch (err) {
    console.log(err);
    
    return res.status(500).send({ error: "server error" });
  }
};
UserController.login = async (req, res, next) => {
    const { mobile, password } = req.body; 
    console.log(mobile) 
    try {
        let user = await User.findOne({ mobile });
        if (!user) {
          res.status(401);
          return res.json({ errors: "Invalid mobile" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          res.status(401);
          return res.json({ errors: "Invalid password" });
        }
        return  res.status(200).send({
            username: user.username,
          });
    }catch (error) {
        return res.status(500).send({ error: "server error" });
      }
}
module.exports = UserController;
