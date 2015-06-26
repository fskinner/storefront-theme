import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import connectToStores from '../utils/connectToStores.js';
import Shelf from '../components/search/Shelf';
import { PureRenderMixin } from 'react/lib/ReactComponentWithPureRenderMixin';

let config1 = {
  title: 'Hambúrgueres',
  search: {
    id: 'home-shelf-1',
    category: 'menu/comidas'
  }
};
let config2 = {
  title: 'Bebidas',
  search: {
    id: 'home-shelf-2',
    category: 'menu/bebidas',
  }
};

let Home = React.createClass({
  mixins: [ PureRenderMixin ],
  statics: {
    getStores() {
      return [
        storefront.flux.stores.SearchStore,
        storefront.flux.stores.ShopStore
      ];
    }
  },

  componentDidMount() {
    const accountName = this.props.ShopStore.get('accountName');

    const search1 = this.props.SearchStore.get(config1.search.id);
    if (!search1 || !search1.results) {
      config1.search.accountName = accountName;
      storefront.flux.actions.SearchActions.requestSearch(config1.search);
    }
    const search2 = this.props.SearchStore.get(config2.search.id);
    if (!search2 || !search2.results) {
      config2.search.accountName = accountName;
      storefront.flux.actions.SearchActions.requestSearch(config2.search);
    }
  },

  render() {
    return (
      <div>
        <Shelf {...config1} />
        <Shelf {...config2} />
      </div>
    );
  }
});

export default connectToStores(Home);
