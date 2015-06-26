import React from 'react';
import MinicartItem from './MinicartItem';
import { FormattedNumber } from 'react-intl';

let Minicart = React.createClass({
  render() {
    let value = this.props.value / 100;
    let items = this.props.items.map((item, index) => {
      item.index = index;
      return (
        <MinicartItem key={item.id} item={item}
                      changeQty={this.props.changeQty}
                      removeItem={this.props.removeItem}
                      currency={this.props.currency} />
      );
    });

    return (
      <div className="ds-minicart">
        <div className="container-fluid">
          {items}

          <div className="ds-minicart-total row text-right">
            <div className="col-md-12">
              <strong>Total: <FormattedNumber style="currency" value={value} currency={this.props.currency} /></strong>
              <a href="/checkout" className="btn btn-primary">Ir para o carrinho</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Minicart;
