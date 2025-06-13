import type { ReactNode } from "react";
import React from "react";


type WithLocalStorageState = {
  data: string;
};

type InjectedProps = {
  data: string;
};

const withLocalStorage = <P extends InjectedProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class extends React.Component<
    Omit<P, keyof InjectedProps>,
    WithLocalStorageState
  > {
    constructor(props: Omit<P, keyof InjectedProps>) {
      super(props);
      this.state = {
        data: "",
      };
    }

    componentDidMount(): void {
      const data = localStorage.getItem("data") || "";
      this.setState({ data });
    }

    render(): ReactNode {
      return (
        <WrappedComponent
          {...(this.props as P)}
          data={this.state.data}
        />
      );
    }
  };
};

type MyComponentProps = InjectedProps;

class MyComponent extends React.Component<MyComponentProps> {
  render(): ReactNode {
    return <>{this.props.data}</>;
  }
}

const NewComponent = withLocalStorage(MyComponent);
export default NewComponent;
