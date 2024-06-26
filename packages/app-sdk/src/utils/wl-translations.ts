export class Translations {
  constructor(public data: any) {}
  public getText = (key: string | (string | number)[]) => {
    if (typeof key === "string") {
      return this.data[key] || "";
    } else if (typeof key === "object") {
      return this.deepGet(key);
    }
    return "";
  };

  private deepGet = (p: (string | number)[]) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), this.data);
}

export function mapLoginError(message: string | undefined, translations: Translations) {
  switch (message) {
    case "INCORRECT_CREDENTIALS":
    case "BAD_PASSWORD":
      return translations.getText(["ERROR", "LOGIN", "INVALID_CREDENTIALS"]);
    case "MIGRATED_USER":
      return translations.getText(["ERROR", "LOGIN", "MIGRATED_USER"]);
    case "USERNAME_ALREADY_IN_USE":
      return translations.getText("USERNAME_ALREADY_IN_USE");
    default:
      return translations.getText(["ERROR", "LOGIN", "UNKNOWN"]);
  }
}
