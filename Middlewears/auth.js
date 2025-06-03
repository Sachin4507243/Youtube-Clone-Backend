const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");

exports.Authorization = async (req, res, next) => {
  const token = req.cookies.token; // ✅ corrected cookie name from 'tokens' to 'token' (as per your signIn code)

  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token, authorization denied" });
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    // ✅ Ensure you are extracting user ID correctly (from decode.user)
    req.user = await User.findById(decode.user).select("-password");

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
