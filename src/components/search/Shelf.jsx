import storefront from 'storefront';
import React from 'react';
import connectToStores from 'utils/connectToStores';
import ShelfItem from './ShelfItem';
import compact from 'lodash/array/compact';

let Shelf = React.createClass({
  statics: {
    getStores() {
      return [
        storefront.flux.stores.ProductStore,
        storefront.flux.stores.SearchStore,
        storefront.flux.stores.ShopStore,
        storefront.flux.stores.CartStore
      ];
    }
  },

  getSearch() {
    return this.props.SearchStore.get(this.props.search.id);
  },

  render() {
    let products, shelfItems;
    const ProductStore = this.props.ProductStore;
    const ShopStore = this.props.ShopStore;
    const CartStore = this.props.CartStore;

    const search = this.getSearch();

    if (search && search.results && search.results.length > 0) {
      products = compact(search.results.map( slug => ProductStore.get(slug) ));
      shelfItems = products.map( product =>
        <ShelfItem product={product}
          key={product.slug}
          accountName={ShopStore.get('accountName')}
          currency={ShopStore.get('currency')}
          orderForm={CartStore.get('orderForm')} />
      );
    }

    return (
      <div className="ds-main container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h3 className="ds-category-name">{this.props.title}</h3>
            { shelfItems }
          </div>
        </div>
      </div>
    );
  }
});

export default connectToStores(Shelf);
