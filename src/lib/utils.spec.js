import { inCloseRange, isNumber } from './utils';

describe('utils module', () => {
  describe('inCloseRange function', () => {
    it('return true when distance between two numbers is less or equal than 4', () => {
      expect(inCloseRange(5, 1)).toBeTruthy();
      expect(inCloseRange(1, 2)).toBeTruthy();
    });
    it('return true when distance between two numbers is grater than 4', () => {
      expect(inCloseRange(6, 1)).toBeFalsy();
      expect(inCloseRange(10, 1)).toBeFalsy();
    });
    it('return false when argument is not a number', () => {
      expect(inCloseRange(4, 'xyz')).toBeFalsy();
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
});
