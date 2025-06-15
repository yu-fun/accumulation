import React from 'react';
import { type ReactNode } from 'react';

// 通过ref访问组件实例
function withRef(WrappedComponent) {
  return class extends React.Component {
    wrappedInstance: any;

    constructor(props) {
      super(props);
    }

    someMethod() {
      const m = this.wrappedInstance.getMenus();
      console.log('m', m);
      
    }

    componentDidMount(): void {
      this.someMethod()
    }

    render(): ReactNode {
      return (
        <WrappedComponent
          {...this.props}
          ref={(instance: any) => (this.wrappedInstance = instance)}
        />
      );
    }
  };
}

export default withRef;
