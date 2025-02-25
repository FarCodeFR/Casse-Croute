import { decode } from "node:punycode";
import { verify } from "argon2";
import type { RequestHandler } from "express";
import { sign } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import userRepository from "../user/userRepository";

interface JwtPayload {
  isAdmin: number;
}

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userRepository.getUserByEmail(email);
  if (user === null || user === undefined) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  try {
    // Verify the password - make sure that you double check the way it's called in the first argument (defined in types)
    const isValid = await verify(user.mot_de_passe, password);

    // If the password is valid, create a token
    if (isValid) {
      // Create a token - payload is the 'body' of the token - header is automatically added
      const payload = {
        id: user.id,
        email: user.email,
        isAdmin: user.est_admin,
      };
      // Make sure to define the APP_SECRET in your .env file
      const secretKey = process.env.APP_SECRET;

      if (!secretKey) {
        throw new Error("APP_SECRET is not defined");
      }
      // Sign the token with the payload, secret key, and expiration time - the signing is the last element to add to the token.
      const token = sign(payload, secretKey, { expiresIn: "1h" });
      res.json({ token, user: user.email, isAdmin: user.est_admin });
      return;
    }
  } catch {
    // If the password is invalid, return a 401 status code
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      throw new Error("No token provided");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Invalid token type");
    }

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) {
      throw new Error("APP_SECRET is not defined");
    }

    const decodedToken = jwt.verify(token, secretKey) as JwtPayload;

    if (decodedToken && decodedToken.isAdmin !== undefined) {
      res.locals.decodedToken = decodedToken;
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const isLogged: RequestHandler = (req, res) => {
  if (res.locals.decodedToken) {
    const { isAdmin } = res.locals.decodedToken;
    res.status(200).json({ message: "Vous êtes connecté", isAdmin });
    return;
  }
  res.sendStatus(403);
};

const isAdmin: RequestHandler = (req, res) => {
  if (!res.locals.decodedToken) {
    res.sendStatus(403);
  }

  res.status(200).send("Vous êtes admin !");
};

export default { login, verifyToken, isLogged, isAdmin };
