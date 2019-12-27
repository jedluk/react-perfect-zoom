import { cropImage } from './crop';

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
    expect(cropImage(image, currentPositions)).toEqual({
      marginTop: -30,
      marginLeft: -30,
      marginRight: -1525,
      marginBottom: -840
    });
  });
});
