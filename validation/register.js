const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Le nom doit être entre 2 et 30 caractères";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Un nom est requis";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Une adresse mail est requise";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "L'adresse mail est invalide";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Un mot de passe est requis";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Le mot de passe doit faire au moins 6 caractères";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Vous devez confirmez votre mot de passe";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Les mots de passes ne correspondent pas";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
