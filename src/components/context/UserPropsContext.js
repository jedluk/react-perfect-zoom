import React from 'react';
import { pick, emptyArray } from '../../lib/utils';

export const UserProps = React.createContext({});

export function withUserProps(contextProps) {
  return function transformComponent(Component) {
    return (props) => {
      return (
        <UserProps.Consumer>
          {(state) => (
            <Component
              {...props}
              {...(emptyArray(contextProps) ? state : pick(state, contextProps))}
            />
          )}
        </UserProps.Consumer>
      );
    };
  };
}
