import config from "../config";

export default class ColorIterator {
  static default() {
    return new ColorIterator(config.colors);
  }

  constructor(colors) {
    this._colors = colors;
    this._colorCursor = 0;
  }

  next() {
    if (this._colorCursor >= this._colors.length) {
      this._colorCursor = 0;
    }

    return this._colors[this._colorCursor++];
  }
}
