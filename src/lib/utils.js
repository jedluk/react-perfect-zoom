export const isElement = (element) =>
  element instanceof Element || element instanceof HTMLDocument;

export const isNumber = (x) => typeof x === 'number';

export const inCloseRange = (x, y) => Math.abs(x - y) <= 2;
