import React from 'react';
import { FormattedNumber } from 'react-intl';

let ProductPrice = React.createClass({
  render() {
    let sku = this.props.product.items[0];
    let hasListPrice = sku.sellers[0].offer.listPrice > sku.sellers[0].offer.price;
    let discountValue = sku.sellers[0].offer.listPrice - sku.sellers[0].offer.price;
    let discountPercent = discount * 100 / sku.sellers[0].offer.listPrice;
    discountPercent = discountPercent.split('.')[0];

    let listPrice, discount;
    if (hasListPrice) {
      listPrice = (
        <tr className="ds-product-list-price-row" key="listPrice">
          <td className="ds-product-price-table-label">
            Preço de Tabela:
          </td>
          <td className="ds-product-price-table-value">
            <FormattedNumber style="currency" value={sku.sellers[0].offer.listPrice} currency={this.props.currency} />
          </td>
        </tr>
      );
      discount = (
        <tr className="ds-product-savings-row" key="discount">
          <td className="ds-product-price-table-label">
            Economia de:
          </td>
          <td className="ds-product-price-table-value">
            <FormattedNumber style="currency" value={discount} currency={this.props.currency} /> ({ discountPercent })
          </td>
        </tr>
      );
    } else {
      listPrice = '';
      discount = '';
    }

    return (
      <div className="ds-product-price-container">
        <table className="ds-product-price-table">
          <tbody>
            { listPrice }
            <tr className="ds-product-price-row" key="price">
              <td className="ds-product-price-table-label">
                Preço:
              </td>
              <td className="ds-product-price-table-value">
                { sku.sellers[0].offer.price }
              </td>
            </tr>
            { discount }
          </tbody>
        </table>
      </div>
    );
  }
});

export default ProductPrice;
