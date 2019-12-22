import {
  getBottomCoordinates,
  getLeftCoordinates,
  getTopCoordinates,
  getRightCoordinates,
  getZoomContainerDistance,
  cropImage
} from './coordinates';

describe('coordinates module', () => {
  const currentPositions = { currentX: 25, currentY: 20, clickX: 10, clickY: 10 };
  describe('getTopCoordinates function', () => {
    it('return object with calculated top, left and width numbers', () => {
      expect(getTopCoordinates(currentPositions)).toEqual({
        top: 10,
        left: 10,
        width: 15
      });
    });
  });
  describe('getRightCoordinates function', () => {
    it('return object with calculated top, left and height numbers', () => {
      expect(getRightCoordinates(currentPositions)).toEqual({
        height: 10,
        left: 10,
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
        left: 25,
        top: 10
      });
    });
  });
  describe('cropImage function', () => {
    it('return margin coordinates which allow to crop image', () => {
      const image = {
        clientHeight: 300,
        naturalHeight: 900,
        naturalWidth: 1600
      };
      expect(cropImage(image, currentPositions)).toEqual({
        marginTop: -30,
        marginLeft: -30,
        marginRight: -1525,
        marginBottom: -840
      });
    });
  });
  describe('getZoomContainerDistance function', () => {
    it('return distance between thumbnail and real image', () => {
      const image = {
        naturalHeight: 900,
        clientHeight: 500
      };
      expect(getZoomContainerDistance(image, currentPositions)).toEqual(-27);
    });
  });
});
