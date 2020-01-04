import {
  getPlacementFunction,
  getHorizontalDistance,
  getVerticaDistance,
  withTranslation,
  areValidPositions
} from './placement';

describe('placement module', () => {
  describe('getPlacementFunction function', () => {
    it('return function when passing one of left, right, top, bottom', () => {
      ['left', 'right', 'top', 'bottom'].forEach((arg) =>
        expect(getPlacementFunction(arg)).toBeInstanceOf(Function)
      );
    });
    it('return undefined when passing no one of left, right, top, bottom', () => {
      expect(getPlacementFunction('xyz')).toBeUndefined();
    });
    it('return top and left coordinates when calling it twice', () => {
      const image = {
        clientWidth: 200,
        naturalHeight: 500,
        clientHeight: 100
      };
      const positions = {
        clickX: 10,
        clickY: 10,
        currentX: 50,
        currentY: 50
      };
      ['left', 'right', 'top', 'bottom'].forEach((arg) => {
        expect(getPlacementFunction(arg)(image, positions)).toBeInstanceOf(Object);
        expect(getPlacementFunction(arg)(image, positions)).toHaveProperty('top');
        expect(getPlacementFunction(arg)(image, positions)).toHaveProperty('left');
      });
    });
  });
  describe('getHorizontalDistance function', () => {
    it('return scaled distance between clickX and currentX multiplied', () => {
      expect(getHorizontalDistance(2, { currentX: 10, clickX: 20 })).toEqual(20);
    });
  });
  describe('getVerticalDistance function', () => {
    it('return scaled dsitance between clickY and currentY', () => {
      expect(getVerticaDistance(2, { clickY: 10, currentY: 20 })).toEqual(20);
    });
  });
  describe('with translation function', () => {
    it('add translation to top and left properties of object', () => {
      expect(withTranslation({ x: 10, y: 10 })({ top: 2, left: 20 })).toEqual({
        top: 12,
        left: 30
      });
    });
  });
  describe('areValidPositions function', () => {
    const positions = {
      clickX: 10,
      clickY: 10,
      currentX: 50,
      currentY: 50
    };
    it('return true when positions is object with known keys and all values are number', () => {
      expect(areValidPositions(positions)).toBeTruthy();
    });
    it('return false when some values are not a numbers', () => {});
    const incorrectPositions = {
      ...positions,
      clickX: 'not a number'
    };
    expect(areValidPositions(incorrectPositions)).toBeFalsy();
  });
  it('return false when positions is not an object', () => {
    expect(areValidPositions(null)).toBeFalsy();
    expect(areValidPositions(false)).toBeFalsy();
    expect(areValidPositions('qwerty')).toBeFalsy();
    expect(areValidPositions(98)).toBeFalsy();
  });
});
