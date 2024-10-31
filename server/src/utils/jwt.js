import jwt from "jsonwebtoken";

export const generateToken = (user, secretSignature, tokenLife) => {
  const token = jwt.sign(user, secretSignature, {
    algorithm: "HS256",
    expiresIn: tokenLife
  });
  return token;
};

export const verifyToken = (token, secretSignature) => {
  try {
    return jwt.verify(token, secretSignature);
  } catch (error) {
    throw new Error(error);
  }
};
