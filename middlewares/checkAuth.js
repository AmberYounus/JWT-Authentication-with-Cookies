import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("No token provided");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(403).json("invalid token");
    }
    req.user = {
      id: payload.id,
    };
    next();
  });
};
