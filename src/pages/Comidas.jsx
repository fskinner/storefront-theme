import storefront from 'storefront';
import React from 'react';
import connectToStores from '../utils/connectToStores.js';
import Shelf from '../components/search/Shelf';
import { PureRenderMixin } from 'react/lib/ReactComponentWithPureRenderMixin';

let config = {
  title: 'Hambúrgueres',
  search: {
    id: 'comidas-page',
    category: 'menu/comidas'
  }
};

let Bebidas = React.createClass({
  mixins: [ PureRenderMixin ],
  statics: {
    getStores() {
      return [
        storefront.flux.stores.SearchStore,
        storefront.flux.stores.ShopStore
      ];
    }
  },

  requestSearch(props = this.props) {
    const accountName = props.ShopStore.get('accountName');
    // TODO cache results for every search
    config.search.accountName = accountName;
    storefront.flux.actions.SearchActions.requestSearch(config.search);
  },

  componentWillMount() {
    const search = this.props.SearchStore.get(config.search.id);
    const sameSearchQuery = search && this.props.params.search === search.query;
    if (sameSearchQuery) {
      return;
    }
    this.requestSearch();
  },

  componentWillReceiveProps(nextProps) {
    const sameSearchQuery = this.props.params.search === nextProps.params.search;
    if (sameSearchQuery) {
      return;
    }
    this.requestSearch(nextProps);
  },

  render() {
    return (
      <Shelf {...config} />
    );
  }
});

export default connectToStores(Bebidas);
