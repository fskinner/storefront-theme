/**
 * Expects the Component to have two static methods:
 *   - getStores(): Should return an array of stores.
 *   - getPropsFromStores(props): Should return the props from the stores.
 *
 *    @connectToStores([myStore])
 *    const MyComponent = React.createClass({
 *      statics: {
 *        getStores(props) {
 *          return [myStore]
 *        },
 *        getPropsFromStores(props) {
 *          return myStore.getState()
 *        }
 *      },
 *      render() {
 *        // Use this.props like normal ...
 *      }
 *    })
 *    MyComponent = connectToStores(MyComponent)
 *
 */

import React from 'react';
import { assign, isFunction } from './functions.js';

const getStateFromStores = function (stores) {
  const state = {};
  stores.forEach( store => state[store.displayName] = store.state );
  return state;
};

function connectToStores(Component) {
  // Check for required static methods.
  if (!isFunction(Component.getStores)) {
    throw new Error('connectToStores() expects the wrapped component to have a static getStores() method');
  }

  // Wrapper Component.
  const StoreConnection = React.createClass({
    getInitialState() {
      return getStateFromStores(Component.getStores(this.props));
    },

    componentWillMount() {
      let stores = Component.getStores(this.props);
      stores.forEach((store) => {
        store.listen(this.onChange);
      });
    },

    componentWillUnmount() {
      let stores = Component.getStores(this.props);
      stores.forEach((store) => {
        store.unlisten(this.onChange);
      });
    },

    onChange() {
      let storeStates = getStateFromStores(Component.getStores(this.props));
      this.setState(assign(this.state, storeStates));
    },

    render() {
      return React.createElement(
        Component,
        assign({}, this.props, this.state)
      );
    }
  });

  return StoreConnection;
}

export default connectToStores;
