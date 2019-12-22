import React from 'react';
import Zoom from './Zoom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

describe('Zoom component', () => {
  afterEach(cleanup);

  const positions = { currentX: 25, currentY: 20, clickX: 10, clickY: 10 };
  const imgRef = {
    current: { naturalHeight: 900, naturalWidth: 1600, clientHeight: 500 }
  };
  it('render nothing when imgRef is not a DOM element', () => {
    render(
      <Zoom imgRef={null} source="img.jpg" placement="left" positions={positions} />
    );
    expect(screen.queryByAltText('realImage')).toBeNull();
  });
  it('render zoom component when img ref is defined image', () => {
    render(<Zoom imgRef={imgRef} positions={positions} placement="left" />);
    expect(screen.queryByAltText('realImage')).toBeNull();
  });
});
