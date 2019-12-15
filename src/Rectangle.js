import React, { Fragment } from 'react'

const getTopCoordinates = (clickX, clickY, currentX, currentY) => ({
    top: Math.min(clickY, currentY),
    left: clickX > currentX ? currentX : clickX,
    width: Math.abs(currentX - clickX)
});

const getBottomCoordinates = (clickX, clickY, currentX, currentY) => ({
    top: Math.max(clickY, currentY),
    left: Math.min(clickX, currentX),
    width: Math.abs(currentX - clickX)
});

const getRightCoordinates = (clickX, clickY, currentX, currentY) => ({
    top: clickY,
    left: clickX,
    height: Math.abs(currentY - clickY)
});

const getLeftCoordinates = (clickX, clickY, currentX, currentY) => ({
    top: clickY,
    left: currentX,
    height: Math.abs(currentY - clickY)
});

const isNumber = x => typeof x === 'number';

const Rectangle = ({ clickX, clickY, currentX, currentY }) => {
    if (!isNumber(clickX) || !isNumber(clickY)) {
        return null;
    }
    return (
        <Fragment>
            <div
                className="zoom-top-border"
                style={getTopCoordinates(clickX, clickY, currentX, currentY)}
            />
            <div
                className="zoom-bottom-border"
                style={getBottomCoordinates(clickX, clickY, currentX, currentY)}
            />
            <div
                className="zoom-right-border"
                style={getRightCoordinates(clickX, clickY, currentX, currentY)}

            />
            <div
                className="zoom-left-border"
                style={getLeftCoordinates(clickX, clickY, currentX, currentY)}
            />
        </Fragment>
    )
}

export default React.memo(Rectangle);