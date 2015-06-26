import React from 'react';
import connectToStores from 'utils/connectToStores.js';
import { Navigation, State, Link } from 'react-router';
import Style from './footer.less';
import { FormattedNumber } from 'react-intl';
import { Button } from 'react-bootstrap';

let Footer = React.createClass({
  mixins: [ Navigation, State ],
  statics: {
    getStores() {
      return [
        storefront.flux.stores.CartStore,
        storefront.flux.stores.ShopStore
      ];
    }
  },

  render() {
    let currency = this.props.ShopStore.get('currency');
    let orderForm = this.props.CartStore.get('orderForm');
    let valueComponent, value;
    if (currency && orderForm && orderForm.value) {
      value = orderForm.value / 100;
      valueComponent = <FormattedNumber style="currency" value={value} currency={currency} />;
    }

    if (this.isActive('checkout')) {
      return (
        <div className="ds-footer">
          <span className="ds-value">{ valueComponent }</span>
          <Link to="success" className="pull-right">
            <Button>Confirmar</Button>
          </Link>
        </div>
      );
    }

    if (this.isActive('success')) {
      return null;
    }

    return (
      <div className="ds-footer">
        <span className="ds-value">{ valueComponent }</span>
        <Link to="checkout" className="pull-right">
          <Button>Pagar</Button>
        </Link>
      </div>
    );
  }

});

export default connectToStores(Footer);
