import { getRelativeCoordinates, getPositions, isOutsideImageRectangle } from './mixins';

describe('mixins module', () => {
  describe('getPositions function', () => {
    it('retrun correctyly formatted state', () => {
      const startPosition = { x: 100, y: 100 };
      const currentPosition = { x: 140, y: 150 };
      const obj = {
        state: {
          startPosition,
          currentPosition
        }
      };
      expect(getPositions.call(obj)).toEqual({
        clickX: 100,
        clickY: 100,
        currentX: 140,
        currentY: 150
      });
    });
    it('throw TypeError while passing object without state', () => {
      expect(() => getPositions().call({})).toThrow(TypeError);
    });
  });
  describe('getRelativeCoordinates function', () => {
    it('return coordinates relative to given object', () => {
      const imageRect = { x: 100, y: 100 };
      const event = { pageX: 500, pageY: 450 };
      expect(getRelativeCoordinates(imageRect, event)).toEqual({
        x: 400,
        y: 350
      });
    });
  });
  describe('isOutsideImageRectangle function', () => {
    const boundingRect = {
      right: 100,
      left: 100,
      top: 10,
      bottom: 10
    };
    it('return true when position is close to image border', () => {
      const e = {
        pageX: 97,
        pageY: 1
      };
      expect(isOutsideImageRectangle(5)(boundingRect)(e)).toBeTruthy();
    });
    it('return false when position is not in close range to image border', () => {
      const e = {
        pageX: 50,
        pageY: 50
      };
      expect(isOutsideImageRectangle(5)(boundingRect)(e)).toBeFalsy();
    });
  });
});
