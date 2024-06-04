import { NEXTAUTH_SECRET } from "@/config";
import jwt from "jsonwebtoken";

const JWT_SECRET = NEXTAUTH_SECRET || "strawberry-apple-secret";

export async function signJwt(userId: string): Promise<string> {
  // The payload could include any claims you want to assert.
  // Here we're just including the user ID in a "sub" claim.
  const payload = {
    sub: userId,
    // Set the issue time to now
    iat: Math.floor(Date.now() / 1000),
    // Set the expiration time (optional)
    // exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in one hour
    // never expires
  };

  // The sign method creates the JWT token
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (err, token) => {
      if (err || !token) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

export async function verifyJwt(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}
