# React perfect zoom

React-perfect-zoom is React component which allow you to see exact part of image thumbnail in real dimensions next to it. It's extremely useful i.e. when reading articles, viewing stuff on on-line shops etc. Placement of real image is determined by the user.

![Alt Demo](https://raw.githubusercontent.com/jedluk/random/master/react-perfect-zoom/perfect_zoom_demo.gif)

Component is built with create-react-app boilerplate without additional npm dependencies (either canvas element is not used). Please be aware that current version is first release and is just a germ of something bigger. A lot of ideas must be coded.

## Instalation

To install component run command in root of your project

```bash
npm install react-perfect-zoom
```

There are no additional steps needed (like inserting css styles).

## Usage

```js
import React from 'react';
import sample from './assets/sample.jpg';
import PerfectZoom from 'react-perfect-zoom';

const SomeComponent = (props) => (
  <div style={{ display: 'flex', margin: 20 }}>
    <PerfectZoom placement="right" source={sample} thumbnailSize={[300, 500]} />
    <p> lorem ipsum (...) Cras et maximus lectus. </p>
  </div>
);
```

## Props

```js
//
// Basic props
//

// source of thumbnail and real image; thumbnail will be scaled to desired size, real image show
source: string

// dimensions of thumbnail
thumbnailSize: ?[number, number] = [300,500]

// placement of real image
placement: ('left' | 'right') = 'right'
```

## Contribute

Any kind of help is highly appreciated. Feel free to add any kind of issue and create feature request.

## TODO LIST

- [ ] allow to show real image in any postion (including portal to given element)
- [ ] distinguish between thumbnail source and real image source (+ load 'on demand')
- [ ] allow to use custom classes (rectangle)
