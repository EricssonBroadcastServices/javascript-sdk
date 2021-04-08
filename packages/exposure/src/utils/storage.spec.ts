import { sessionKeyStorage } from "./storage";

describe("storage", () => {
  describe("sessionKeyStorage", () => {
    it("should be possible to set and get item", () => {
      const key = "testKey";
      const value = "testValue";

      sessionKeyStorage.setItem(key, value);
      expect(sessionKeyStorage.getItem(key)).toEqual(value);
    });
    it("should be possible to remove item", () => {
      const key = "testKey";
      const value = "testValue";

      sessionKeyStorage.setItem(key, value);
      expect(sessionKeyStorage.getItem(key)).toEqual(value);

      sessionKeyStorage.remove(key);
      expect(sessionKeyStorage.getItem(key)).toBeFalsy();
    });
  });
});
