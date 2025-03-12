import type { RequestHandler } from "express";
import { body, validationResult } from "express-validator";

const loginValidate = [
  body("email", "Le champ email ne peut pas être vide").not().isEmpty(),
  body("email", "Email invalide").isEmail(),
  body("password", "Le champs mot de passe ne peut pas être vide")
    .not()
    .isEmpty(),
  body(
    "password",
    "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.",
  ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
];

const createRecipeValidate = [
  body("image_url", "Le champ image ne peut pas être vide").not().isEmpty(),
  body("image_url", "URL de l'image et invalide").matches(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
  ),
  body("titre", "Le champ titre ne peut pas être vide").not().isEmpty(),
  body("description", "Le champ description ne peut pas être vide")
    .not()
    .isEmpty(),
  body("temps_id", "Le champ temps ne peut pas être vide").not().isEmpty(),
  body("difficulte_id", "Le champ difficulte ne peut pas être vide")
    .not()
    .isEmpty(),
  body("type_id", "Le champ type ne peut pas être vide").not().isEmpty(),
  body("preparation", "Le champ preparation ne peut pas être vide")
    .not()
    .isEmpty(),
];

const modifyProfilValidate = [
  body("email", "Le champ email ne peut pas être vide").not().isEmpty(),
  body("email", "Email invalide").isEmail(),
  body("pseudo", "Identifiant invalide").not().isEmpty(),
];

const registerValidate = [
  body("email", "Le champ email ne peut pas être vide").not().isEmpty(),
  body("email", "Email invalide").isEmail(),
  body("pseudo", "Identifiant invalide").not().isEmpty(),
  body("password", "Le champs mot de passe ne peut pas être vide")
    .not()
    .isEmpty(),
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
export default {
  validation,
  modifyProfilValidate,
  createRecipeValidate,
  registerValidate,
  loginValidate,
};
