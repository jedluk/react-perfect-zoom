import React from 'react';
import '../assets/loader.css';

export default function Loader(props) {
  return (
    <div className="bouncing-loader" style={props.position}>
      <div />
      <div />
      <div />
    </div>
  );
}
