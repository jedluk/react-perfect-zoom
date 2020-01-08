import {
  getBottomCoordinates,
  getLeftCoordinates,
  getTopCoordinates,
  getRightCoordinates
} from '../rectangleCoordinates';

describe('coordinates module', () => {
  const currentPositions = {
    currentX: 25,
    currentY: 20,
    clickX: 10,
    clickY: 10
  };
  const style = {
    color: '#350058',
    size: 5
  };
  describe('getTopCoordinates function', () => {
    it('return object with calculated top, left and width numbers', () => {
      expect(getTopCoordinates(currentPositions)).toEqual({
        top: 10,
        left: 10,
        width: 15
      });
    });
    it('add height and color to object when passing second argument', () => {
      const output = getTopCoordinates(currentPositions, style);
      expect(output.height).toEqual(style.size);
      expect(output.backgroundColor).toEqual(style.color);
    });
  });
  describe('getRightCoordinates function', () => {
    it('return object with calculated top, left and height numbers', () => {
      expect(getRightCoordinates(currentPositions)).toEqual({
        height: 10,
        left: 23, // 25 - 2  (2 from border)
        top: 10
      });
    });
  });
  describe('getBottomCoordinates function', () => {
    it('return object with calculated top, left and width numbers', () => {
      expect(getBottomCoordinates(currentPositions)).toEqual({
        top: 20,
        left: 10,
        width: 15
      });
    });
  });
  describe('getLeftCoordinates function', () => {
    it('return object with calculated top, left and height numbers', () => {
      expect(getLeftCoordinates(currentPositions)).toEqual({
        height: 10,
        left: 10,
        top: 10
      });
    });
  });
});
