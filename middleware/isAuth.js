const jwt = require("jsonwebtoken");

function isAuth(req, res, next) {
 let  token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		token = req.cookies.token
	}

  if (!token) {
    return res.json({
      statusCode: 401,
      result: "You are not logged in. Please login or register to continue.",
    });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken); //remove
    req.user = { id: decodedToken.id, username: decodedToken.username };
    console.log("User: ", req.user); // remove
  } catch (err) {
    return res.json({
      statusCode: 401,
      result:
        "Your session has been timed out. Please login again to continue.",
    });
  }
  next();
}

module.exports = {isAuth}
