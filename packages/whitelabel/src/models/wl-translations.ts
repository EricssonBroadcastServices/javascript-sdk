export class Translations {
  constructor(public data) {}
  public getText = (key: string | (string | number)[]) => {
    if (typeof key === "string") {
      return this.data[key] || "";
    } else if (typeof key === "object") {
      return this.deepGet(key);
    }
    return "";
  }

  private deepGet = (p: (string|number)[]) =>
    p.reduce((xs, x) =>
    (xs && xs[x]) ? xs[x] : null, this.data)
}
