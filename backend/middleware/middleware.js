const validator = require("validator");
const jwt = require("jsonwebtoken");

const escapeInputs = (req, res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = validator.escape(req.body[key]);
    }
  }
  next();
};

const passwordCheck = (req, res, next) => {
  const { password } = req.body;

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      error: `Password must contain: 
            At least 8 characters
            At least 1 uppercase letter
            At least 1 lowercase letter
            At least 1 number`,
    });
  }

  next();
};

const verifyAccessToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({ error: "No access token found, please login again" });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "No access token found, please login again" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (accessTokenError) => {
    if (accessTokenError) {
      return checkRefreshToken(req, res, next);
    }

    next();
  });
};

const checkRefreshToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const { refreshToken } = jwt.decode(token);

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    (refreshTokenError) => {
      if (refreshTokenError) {
        return res
          .status(401)
          .json({ error: "Invalid refresh token, please login again" });
      }

      next();
    }
  );
};

module.exports = { escapeInputs, verifyAccessToken, passwordCheck };
