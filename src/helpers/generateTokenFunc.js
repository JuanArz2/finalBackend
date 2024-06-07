import jwt from "jsonwebtoken";

export function generateToken(xPayload) {
  return new Promise((res, rej) => {
    jwt.sign(xPayload, "secretKey", { expiresIn: "1h" }, (error, token) => {
      if (error) {
        rej({ error });
      } else {
        res({ token });
      }
    });
  });
}
