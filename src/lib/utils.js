export const isNumber = (x) => typeof x === 'number';

export const isString = (x) => typeof x === 'string';

export const isObject = (x) => typeof x === 'object' && x !== null;

export const inRange = (range) => (x, y) => Math.abs(x - y) <= range;

export const getProperty = (obj, path, fallback) => {
  if (!isObject(obj) || !isString(path)) {
    return fallback;
  }
  const props = path.split('.');
  let value = obj[props.shift()];
  while (props.length > 0) {
    value = value[props.shift()];
  }
  return value || fallback;
};
