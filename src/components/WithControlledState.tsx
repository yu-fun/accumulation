import type { ReactNode } from 'react';
import React from 'react';

// 组件状态提升
function withControlledState(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
      };
      this.handleValueChange = this.handleValueChange.bind(this)
    }

    handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({ value: e.target.value });
    }

    render(): ReactNode {
      // newProps 保存受控组件需要使用的属性和事件处理函数
      const newProps = {
        controlledProps: {
          value: this.state.value,
          onChange: this.handleValueChange,
        },
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

export default withControlledState;
