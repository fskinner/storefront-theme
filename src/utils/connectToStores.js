/**
 *    @connectToStores([myStore])
 *    class MyComponent extends React.Component {
 *      render() {
 *        this.props.myStore // has myStore.state
 *      }
 *    }
 */

import React from 'react';

const eachObject = function(f, o) {
  o.forEach((from) => {
    Object.keys(Object(from)).forEach((key) => {
      f(key, from[key]);
    });
  });
};

const assign = function(target, ...source) {
  eachObject((key, value) => target[key] = value, source);
  return target;
};

const getStateFromStores = function (stores) {
  const state = {};
  stores.forEach( store => state[store.displayName] = store.state );
  return state;
};

function connectToStores(stores) {
  return function decorator(Component) {
    const StoreConnection = React.createClass({
      getInitialState() {
        return getStateFromStores(stores);
      },

      componentWillMount() {
        stores.forEach((store) => {
          store.listen(this.onChange);
        });
      },

      componentWillUnmount() {
        stores.forEach((store) => {
          store.unlisten(this.onChange);
        });
      },

      onChange() {
        this.setState(assign(this.state, getStateFromStores(stores)));
      },

      render() {
        return React.createElement(
          Component,
          assign({}, this.props, this.state)
        );
      }
    });

    return StoreConnection;
  };
}

export default connectToStores;
