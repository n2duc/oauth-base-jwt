import jwt from "jsonwebtoken";

export const generateToken = (user, secret, tokenLife) => {
  const token = jwt.sign(user, secret, {
    algorithm: "HS256",
    expiresIn: tokenLife
  });
  return token;
};

export const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      return resolve(decoded);
    });
  });
};
