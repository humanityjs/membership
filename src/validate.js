export default class Validate {
  static isString (item) {
    return typeof item === 'string';
  }

  static isInt (item) {
    return !isNaN(item);
  }

  static isArray (item) {
    return Array.isArray(item);
  }
}
