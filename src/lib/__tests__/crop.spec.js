import { cropImage } from '../crop';

describe('cropImage function', () => {
  const currentPositions = {
    currentX: 25,
    currentY: 20,
    clickX: 10,
    clickY: 10
  };
  it('return margin coordinates which allow to crop image', () => {
    const image = {
      clientHeight: 300,
      naturalHeight: 900,
      naturalWidth: 1600
    };
    const scale = 3.5;
    expect(cropImage(image, scale, currentPositions)).toEqual({
      marginTop: -35,
      marginLeft: -35,
      marginRight: -1512,
      marginBottom: -830
    });
  });
});
