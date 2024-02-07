import { PasswordPolicy } from "@ericssonbroadcastservices/rbm-ott-sdk";
import { Translations } from "./wl-translations";

const UPPERCASE = new RegExp("[A-Z]");
const LOWERCASE = new RegExp("[a-z]");
const NUMBERS = new RegExp("[0-9]");
const SPECIAL = new RegExp("[!@#$ %^&*) (+=._ -]");

const GROUPS = [LOWERCASE, UPPERCASE, SPECIAL, NUMBERS];

/** @description check if a password adheres to the configured password policy */
export function isPasswordValid(password: string, policy: PasswordPolicy) {
  const lengthOk = password.length >= policy.minimumLength;
  const groupsOk = GROUPS.filter(g => password.match(g)).length >= policy.minimumGroups;
  return { lengthOk, groupsOk };
}

/** @description check if two passwords matches eachother and adheres to the configured password policy */
export function validatePassword({
  password,
  policy,
  secondPassword,
  translations
}: {
  password: string;
  secondPassword: string;
  policy: PasswordPolicy;
  translations: Translations;
}) {
  const { lengthOk, groupsOk } = isPasswordValid(password, policy);
  let message = null;
  if (password !== secondPassword) {
    message = translations.getText("PASSWORD_ERROR_MATCH");
  } else if (!lengthOk) {
    message = translations.getText("PASSWORD_ERROR_SHORT");
  } else if (!groupsOk) {
    message = translations.getText("PASSWORD_ERROR_GROUPS").replace("{groups}", policy.minimumGroups.toString());
  }
  return {
    valid: !message && password !== "" && groupsOk && lengthOk,
    message
  };
}
