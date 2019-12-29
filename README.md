# React-perfect-zoom [![npm](https://img.shields.io/npm/v/react-perfect-zoom.svg)](https://www.npmjs.com/package/react-perfect-zoom) [![npm downloads](https://img.shields.io/npm/dm/react-perfect-zoom.svg)](https://www.npmjs.com/package/react-perfect-zoom)

React component which allow you to see exact part of image thumbnail in real dimensions next to it.

![Alt Demo](https://raw.githubusercontent.com/jedluk/random/master/react-perfect-zoom/perfect_zoom_demo.gif)

Demo available here: https://jedluk.github.io/react-perfect-zoom-playground/ . Component is built in pure React without additional npm dependencies (either canvas element is not used). Widge range of props let you display original image exactly where you want it. Currently working on mobile device support.

## Installation

To install component run command in root of your project

```bash
npm install react-perfect-zoom
```

There are no additional steps required (like inserting css styles).

## Usage

```js
import React from 'react';
import sample from './assets/sample.jpg';
import PerfectZoom from 'react-perfect-zoom';

const SomeComponent = (props) => (
  <div style={{ display: 'flex', margin: 20 }}>
    <PerfectZoom
        placement="right"
        source={sample}
        thumbnailSize={[300, 500]}
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

// source of thumbnail and real image; thumbnail will be scaled to desired size, real image is shown without scaling
source: string

// dimensions of thumbnail
thumbnailSize: ?[number, number] = [300,500] // height go first

// placement of real image
placement: ?('left' | 'right' | 'top' | 'bottom') = 'right'

// margin between thumbnail and real image
margin: ?number = 20

// translation of real from its original position
translate: ?{ x: number, y: number }

// styles applied to rectangle
rectangleStyles: ?{ color: string, size: number }


```

## Contribute

Any kind of help is highly appreciated. Feel free to add any kind of issue and create feature request.

## TODO LIST

- [x] allow to show real image in any postion
- [ ] allow to use React Portal when showing original image
- [ ] distinguish between thumbnail source and real image source (+ load 'on demand')
- [x] allow to use custom classes (rectangle)
- [ ] support for mobile devices (touch events)
- [x] remove scrollbars from body when zooming image
- [ ] allow to download cropped image
