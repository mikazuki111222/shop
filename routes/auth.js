const router = require("express").Router();
var User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
//dang ki

router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,

    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SEC_KEY_PASS
    ).toString(),
  });



  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (err) {

    res.status(500).json(err);
    
  }
});

//dang nhap

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SEC_KEY_PASS
    );


    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);


    Originalpassword !== req.body.password &&
      res.status(401).json("wrong credentials!");

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },
            process.env.SEC_KEY_JWT,
            {expiresIn:"3d"}
        )


      const { password, ...others } = user._doc;

    res.status(200).json({...others,accessToken})
  } catch (err) {

    res.status(500).json(err);


  }
});

module.exports = router;
