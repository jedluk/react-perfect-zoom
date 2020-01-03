import { inRange, isNumber, isObject, isString, getProperty } from './utils';

describe('utils module', () => {
  describe('inCloseRange function', () => {
    it('return true when distance between two numbers is less or equal than defined', () => {
      expect(inRange(10)(5, 1)).toBeTruthy();
      expect(inRange(-5, 3)).toBeTruthy();
    });
    it('return false when distance between two numbers is grater than defined', () => {
      expect(inRange(10)(16, 1)).toBeFalsy();
      expect(inRange(10)(-10, 10)).toBeFalsy();
    });
    it('return false when argument is not a number', () => {
      expect(inRange(4)('xyz', 'qw')).toBeFalsy();
    });
  });

  describe('isNumber function', () => {
    it('return true when argument is a number', () => {
      expect(isNumber(4)).toBeTruthy();
    });
    it('return false when argument is not a number', () => {
      expect(isNumber('sdqwd')).toBeFalsy();
      expect(isNumber(false)).toBeFalsy();
      expect(isNumber(null)).toBeFalsy();
      expect(isNumber(undefined)).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
    });
  });
  describe('isString function', () => {
    it('retrun true when argument is a string', () => {
      expect(isString('qwerty')).toBeTruthy();
    });
    it('return false when argument is not a string', () => {
      expect(isString(1)).toBeFalsy();
      expect(isString(true)).toBeFalsy();
      expect(isString(null)).toBeFalsy();
      expect(isString(undefined)).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString({})).toBeFalsy();
    });
  });
  describe('isObject function', () => {
    it('retrun true when argument is an object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject(null)).toBeFalsy();
    });
    it('return false when argument is not an object', () => {
      expect(isObject(1)).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject('dqwd')).toBeFalsy();
      expect(isObject(undefined)).toBeFalsy();
    });
  });
  describe('getProperty function', () => {
    const obj = {
      level1: {
        level2: 3
      }
    };
    it('retrun property of object', () => {
      expect(getProperty(obj, 'level1.level2')).toEqual(3);
    });
    it('retrun undefined when object does not contain given property', () => {
      expect(getProperty(obj, 'efwefw')).toBeUndefined();
    });
    it('retrun undefined when arguments do not match', () => {
      expect(getProperty('nothing', 'efwefw')).toBeUndefined();
    });
  });
});
