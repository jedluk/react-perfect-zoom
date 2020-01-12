import React from 'react';
import { pick } from '../../lib/utils';

export const PefectZoomProps = React.createContext({});

export function withPerfectZoomProps(contextProps) {
  return function transformComponent(Component) {
    return function(props) {
      return (
        <PefectZoomProps.Consumer>
          {(state) => (
            <Component
              {...props}
              {...(!Array.isArray(contextProps) ? state : pick(state, contextProps))}
            />
          )}
        </PefectZoomProps.Consumer>
      );
    };
  };
}
