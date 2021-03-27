import React, { Component } from 'react';


const asyncComponent = (importComponent) => {
    // okay, this component will get a functionas an argument which holds a component as an argument
    // the state: componen is the component which we want to render in the render-method when the componentDidMount()
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }

        render() {
            // we place the component we want to render in a constant C
            const C = this.state.component;

            // we check if the constant has been set and if return it with props spread or will return null
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;