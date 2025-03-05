import type { RequestHandler } from "express";
import { body, validationResult } from "express-validator";

const loginValidate = [
  body("email", "Le champ email ne peut pas être vide").not().isEmpty(),
  body("email", "Email invalide").isEmail(),
  body(
    "password",
    "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
  ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
];

const registerValidate = [
  body("email", "Le champ email ne peut pas être vide").not().isEmpty(),
  body("email", "Email invalide").isEmail(),
  body("pseudo", "Identifiant invalide").not().isEmpty(),
  body(
    "password",
    "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
  ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
];

const validation: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  console.warn(errors);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(422).json({ errors: errors.array() });
  }
};
export default { registerValidate, validation, loginValidate };
