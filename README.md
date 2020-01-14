# React-perfect-zoom [![Build Status](https://travis-ci.org/jedluk/react-perfect-zoom.svg?branch=master)](https://travis-ci.org/jedluk/react-perfect-zoom) [![npm](https://img.shields.io/npm/v/react-perfect-zoom.svg)](https://www.npmjs.com/package/react-perfect-zoom) [![npm downloads](https://img.shields.io/npm/dm/react-perfect-zoom.svg)](https://www.npmjs.com/package/react-perfect-zoom)

React component which allow you to see exact part of image thumbnail in real dimensions next to it. Works also on mobile devices.

![Alt Demo](https://raw.githubusercontent.com/jedluk/random/master/react-perfect-zoom/perfect_zoom_demo.gif)

**Documentation for versions < 1.0 can be found here [v0.5.1](https://github.com/jedluk/react-perfect-zoom/tree/v0.5.1)** \
**Demo available here: [playground](https://jedluk.github.io/react-perfect-zoom-playground/)** \
Component is built in pure React without additional npm dependencies. From version 1.0.0 it's possible to distinguish between thumbnail and real image source (page is not absorbed by fetching big assets on initial load - real image is loaded on demand, when user start zooming). Wide range of props let you display original image exactly where you want it. It works with either mouse or touch events. On desktop it's even possible to download zoomed image (use _allowDownload_ props and simply press 'D' key while zooming).

## Installation

To install component run command in root of your project

```bash
npm install react-perfect-zoom
```

or

```bash
yarn add react-perfect-zoom
```

## Usage

```js
import React from 'react';
import thumbnail from './assets/sample.jpg';
import largeImg from './assets/huge.png';
import PerfectZoom from 'react-perfect-zoom';

const SomeComponent = (props) => (
  <div style={{ display: 'flex', margin: 20 }}>
    <PerfectZoom
        source={{
          thumbnailURL: sample,
          thumbnailSize: [300, 500],
          imageURL: largeImg
        }}
        allowDownload
        placement="right"
        align="center"
        margin={10}
        rectangleStyles={{
            color: '#cc00cc'
            size: 3
        }}
        translate={{
            x: 200,
            y: 100
        }}
    />
    <p> lorem ipsum (...) Cras et maximus lectus. </p>
  </div>
);
```

## Props

```js
//
// Basic props
//

// essential props for component;
// passing thumbnailURL value ensures minimal configuration for the component.
// thumbnailSize determine dimensions of thumbnail (fallback value is set to [300, 500]),
// imageURL is source of orignal image, if no imageURL is provided then thumbnailURL will be treated as imageURL
source: {
    thumbnailURL: string,
    thumbnailSize: ?[number, number],
    imageURL: ?string
}

// placement of real image
placement: ?('left' | 'right' | 'top' | 'bottom') = 'right'

// margin between thumbnail and real image
margin: ?number = 20

// translation of real from its original position
translate: ?{ x: number, y: number }

// styles applied to rectangle
rectangleStyles: ?{ color: string, size: number }

// allow download cropped image
allowDownload: ?boolean = false

// alignment of real image relative to thumbnail
align: ?('start' | 'center' | 'end') = 'center'

```

## Contribute

Any kind of help is highly appreciated. Feel free to add any kind of issue and create feature request.

## TODO LIST

- [x] allow to show real image in any postion
- [ ] allow to use React Portal when showing original image
- [x] distinguish between thumbnail source and real image source (+ load 'on demand')
- [x] allow to use custom classes (rectangle)
- [x] support for mobile devices (touch events)
- [x] remove scrollbars from body when zooming image
- [x] allow to download cropped image
- [x] add new props called 'align' (alignment relative to thumbnail)
- [ ] allow to use custom loader
