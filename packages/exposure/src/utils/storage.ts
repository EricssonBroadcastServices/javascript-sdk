const _storage = {};

const store = (key: string, value: string): void => {
  if (sessionStorage) {
    sessionStorage.setItem(key, value);
  } else {
    _storage[key] = value;
  }
};

const get = (key: string): string | null => {
  if (sessionStorage) {
    return sessionStorage.getItem(key);
  } else {
    return _storage[key];
  }
};

const remove = (key: string): void => {
  if (sessionStorage) {
    sessionStorage.removeItem(key);
  } else {
    delete _storage[key];
  }
};

export const sessionKeyStorage = {
  setItem: (key, value) => store(key, value),
  getItem: key => get(key),
  remove: key => remove(key)
};
