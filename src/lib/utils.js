export const isElement = (element) =>
  element instanceof Element || element instanceof HTMLDocument;

export const isNumber = (x) => typeof x === 'number';

export const isString = (x) => typeof x === 'string';

export const isObject = (x) => typeof x === 'object' && x !== null;

export const inCloseRange = (x, y) => Math.abs(x - y) <= 4;

export const getProperty = (obj, path, fallback) => {
  if (!isObject(obj) || !isString(path)) {
    return;
  }
  const props = path.split('.');
  let value = obj[props.shift()];
  while (props.length > 0) {
    value = value[props.shift()];
  }
  return value || fallback;
};
