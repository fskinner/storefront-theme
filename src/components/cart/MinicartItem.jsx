import React from 'react';
import { FormattedNumber } from 'react-intl';

let MinicartItem = React.createClass({
  handleAddQty() {
    let qty = this.props.item.quantity + 1;
    this.props.changeQty(this.props.item.index, qty);
  },

  handleDecQty() {
    let qty = this.props.item.quantity - 1;
    this.props.changeQty(this.props.item.index, qty);
  },

  handleChangeQty(e) {
    let qty = e.target.value;
    this.props.changeQty(this.props.item.index, qty);
  },

  handleRemoveItem() {
    this.props.removeItem(this.props.item.index);
  },

  render() {
    let item = this.props.item;
    let sellingPrice = item.sellingPrice / 100;
    let totalSellingPrice = sellingPrice * item.quantity;

    return (
      <div className="ds-minicart-item row">
        <div className="col-md-2">
          <a href={item.detailUrl}>
            <img src={item.imageUrl} alt={item.name} />
          </a>
        </div>
        <div className="col-md-6">
          <p>
            <a href={item.detailUrl}>{item.name}</a>
          </p>
          <div className="ds-minicart-qty text-muted">
            <small>
              Quantidade:
              <span className="ds-minicart-qty-input">
                <input ref="qty" type="number" value={item.quantity} onChange={this.handleChangeQty} />
              </span>
            </small>
          </div>
        </div>
        <div className="col-md-4">
          <FormattedNumber style="currency" value={totalSellingPrice} currency={this.props.currency} />
          <small className="ds-minicart-remove-item text-muted" onClick={this.handleRemoveItem}>
             remover
          </small>
        </div>
      </div>
    );
  }
});

export default MinicartItem;
