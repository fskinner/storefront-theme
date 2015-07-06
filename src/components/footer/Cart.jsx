import storefront from 'storefront';
import React from 'react';
import connectToStores from 'utils/connectToStores';
import Minicart from '../cart/Minicart';
import Style from './cart.less'; //eslint-disable-line

const stores = [
  storefront.flux.stores.CartStore,
  storefront.flux.stores.ShopStore
];

let Cart = React.createClass({
  getInitialState() {
    return {
      minicartIsOpen: false
    };
  },

  componentWillMount() {
    storefront.flux.actions.CartActions.requestCart();
  },

  changeQty(itemIndex, qty) {
    let orderForm = this.props.CartStore.get('orderForm');
    let item = orderForm.items[itemIndex];

    item.index = itemIndex;
    item.quantity = qty;

    storefront.flux.actions.CartActions.updateItems(orderForm.orderFormId, [item], undefined, 2000);
  },

  removeItem(itemIndex) {
    let orderForm = this.props.CartStore.get('orderForm');
    let item = orderForm.items[itemIndex];

    item.index = itemIndex;

    storefront.flux.actions.CartActions.removeItems(orderForm.orderFormId, [item]);
  },

  handleMinicartClick() {
    this.setState({minicartIsOpen: !this.state.minicartIsOpen});
  },

  render() {
    let orderForm = this.props.CartStore.get('orderForm');
    let updateLoading = this.props.CartStore.get('updateLoading');
    let cartLength = (orderForm.items && orderForm.items.length) || 0;

    let showMiniCart;
    if (cartLength) {
      showMiniCart = <Minicart items={orderForm.items} value={orderForm.value}
                               changeQty={this.changeQty} clearCart={this.clearCart}
                               removeItem={this.removeItem} updateLoading={updateLoading}
                               currency={this.props.ShopStore.get('currency')} />;
    }

    let minicartClass = 'ds-cart';
    if (this.state.minicartIsOpen) {
      minicartClass += ' ds-minicart-active';
    }

    let cartDOM = (
      <div className={minicartClass}>
        <span className="ds-one-line ds-cart-name" onClick={this.handleMinicartClick}>
          <i className="fa fa-shopping-cart"></i>
          <span className="ds-cart-count">{cartLength}</span>
        </span>

        {showMiniCart}
      </div>
    );

    return cartDOM;
  }

});

export default connectToStores(stores)(Cart);
