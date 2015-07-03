import storefront from 'storefront';
import React from 'react';
import connectToStores from '../utils/connectToStores.js';
import Shelf from '../components/search/Shelf';
import { PureRenderMixin } from 'react/lib/ReactComponentWithPureRenderMixin';

let config1 = {
  title: 'All',
  search: {
    id: 'home-shelf-1'
  }
};

const stores = [
  storefront.flux.stores.SearchStore,
  storefront.flux.stores.ShopStore
];

let Home = React.createClass({
  mixins: [ PureRenderMixin ],

  componentDidMount() {
    const accountName = this.props.ShopStore.get('accountName');

    const search1 = this.props.SearchStore.get(config1.search.id);
    if (!search1 || !search1.results) {
      config1.search.accountName = accountName;
      storefront.flux.actions.SearchActions.requestSearch(config1.search);
    }
  },

  render() {
    return (
      <div>
        <Shelf {...config1} />
      </div>
    );
  }
});

export default connectToStores(stores)(Home);
