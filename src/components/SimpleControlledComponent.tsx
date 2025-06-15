import type { ReactNode } from 'react';
import withControlledState from './WithControlledState';
import React from 'react';

class SimpleControlledComponent extends React.Component<{
  controlledProps: {
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}> {
  render(): ReactNode {
    // 此时的 SimpleControlledComponent 为无状态组件，状态由高阶组件维护
    return <input name="simple" type="text" {...this.props.controlledProps}  />;
  }
}

export const ComponentWithControlledState = withControlledState(
  SimpleControlledComponent
);
export default ComponentWithControlledState;
