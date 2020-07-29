const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
router.get("/test", (req, res) => {
  res.send("test");
});

router.post("/register", async (req, res) => {
  try {
    //this only works for json ?
    //req.body.email for x-www form
    let { email, password, passwordConfirmation, displayName } = req.body;

    if (!email || !password || !passwordConfirmation)
      return res.status(400).json({ message: "Fields empty" });
    if (password.length < 5)
      return res
        .status(400)
        .json({ message: "Password need to be at least 5 characters" });
    if (password != passwordConfirmation)
      return res.status(400).json({ message: "Password inconsistent" });
    if (!displayName) displayName = email;

    const existingUser = await User.findOne({ email: email });
    if (existingUser != null)
      return res
        .status(400)
        .json({ message: "Account with this email already exist" });

    //return a random string used for hashing
    const salt = await bcrypt.genSalt();
    //create the hash
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });

    //save to the database
    const savedUser = await newUser.save();
    res.json(savedUser);
    //encode the user datas, Hashing
  } catch (err) {
    //problem with the database
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Fields empty" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ message: "No account with this email exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    //jwt token is not secure
    //token: {
    //   id,
    //   time
    // }
    const token = jwt.sign({ id: user._id }, process.env.JWT_privateKey);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res, next) => {
  //only enables delete when loged in
  try {
    // console.log(res.locals.user);
    const deletedUser = await User.findByIdAndDelete(res.locals.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//check if the token is valid
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_privateKey);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
