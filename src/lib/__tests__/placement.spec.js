import {
  getCroppedImageSize,
  areValidPositions,
  placementFunc,
  parseTranslation,
  calculateAlignment
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

  describe('placementFunc function', () => {
    it('return function when passing one of left, right, top, bottom', () => {
      ['left', 'right', 'top', 'bottom'].forEach((arg) =>
        expect(placementFunc(arg)).toBeInstanceOf(Function)
      );
    });
    it('return undefined when passing no one of left, right, top, bottom', () => {
      expect(placementFunc('xyz')).toBeUndefined();
    });
    it('return top and left coordinates when calling it twice', () => {
      const thumbnail = {
        clientWidth: 200,
        naturalHeight: 500,
        clientHeight: 100
      };
      const croppedImage = {
        width: 500,
        height: 800
      };

      [('left', 'right', 'top', 'bottom')].forEach((arg) => {
        expect(placementFunc(arg)({ thumbnail, croppedImage })).toBeInstanceOf(Object);
        expect(placementFunc(arg)({ thumbnail, croppedImage })).toHaveProperty('top');
        expect(placementFunc(arg)({ thumbnail, croppedImage })).toHaveProperty('left');
      });
    });
  });

  describe('parse translation function', () => {
    it('return top and left properties from translate object given by the user', () => {
      expect(parseTranslation({ x: 10, y: 10 })).toEqual({
        top: 10,
        left: 10
      });
    });
    it('return top: 0, left: 0 when argument is not valid ', () => {
      expect(parseTranslation({ o: 'o', p: 'p' })).toEqual({
        top: 0,
        left: 0
      });
    });
  });

  describe('calculate alignment function', () => {
    it('return correct top and left values based on provided placemnt', () => {
      const verticalAlign = true;
      const align = 'center';
      const thumbnail = {
        clientHeight: 100,
        naturalHeight: 200
      };
      const croppedImage = {
        width: 500,
        height: 800
      };
      expect(
        calculateAlignment({ croppedImage, thumbnail, verticalAlign })(align)
      ).toEqual({
        top: -350,
        left: 0
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
