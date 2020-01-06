import {
  getCroppedImageSize,
  withAlignment,
  withTranslation,
  areValidPositions,
  placementFunc
} from '../placement';

describe('placement module', () => {
  describe('getCroppedImageSize function', () => {
    it('return real dimensions of cropped image', () => {
      const scale = 2;
      const positions = {
        clickX: 10,
        clickY: 10,
        currentX: 20,
        currentY: 20
      };
      expect(getCroppedImageSize(scale, positions)).toEqual({
        width: 20,
        height: 20
      });
    });
  });

  describe('getPlacementFunction function', () => {
    it('return function when passing one of left, right, top, bottom', () => {
      ['left', 'right', 'top', 'bottom'].forEach((arg) =>
        expect(placementFunc(arg)).toBeInstanceOf(Function)
      );
    });
    it('return undefined when passing no one of left, right, top, bottom', () => {
      expect(placementFunc('xyz')).toBeUndefined();
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
        expect(placementFunc(arg)(image, positions)).toBeInstanceOf(Object);
        expect(placementFunc(arg)(image, positions)).toHaveProperty('top');
        expect(placementFunc(arg)(image, positions)).toHaveProperty('left');
      });
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

  describe('withAlignment function', () => {
    it('align real image relative to thumbnail', () => {
      const align = 'center';
      const placement = 'right';
      const positions = {
        clickX: 10,
        clickY: 10,
        currentX: 20,
        currentY: 20
      };
      const img = {
        clientHeight: 100,
        naturalHeight: 200
      };
      const obj = {
        top: 10,
        left: 10
      };
      expect(withAlignment(align, { placement, positions, img })(obj)).toEqual({
        top: 50,
        left: 10
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
