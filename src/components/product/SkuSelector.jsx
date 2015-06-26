import React from 'react';
import Img from '../Img';
import { FormattedNumber } from 'react-intl';

let ProductSkuSelector = React.createClass({
  render() {
    let product = this.props.product;

    let skus = product.skus.map((sku) => {

      let price;
      if (sku.offers[0].availability > 0) {
        let listPrice;
        if (sku.offers[0].listPrice > sku.offers[0].price) {
          listPrice = <s>De: <FormattedNumber style="currency" value={sku.offers[0].listPrice} currency={this.props.currency} /></s>;
        }

        price = (
          <div>
            { listPrice }
            <div>Por: <FormattedNumber style="currency" value={sku.offers[0].price} currency={this.props.currency} /> à vista</div>
          </div>
        );
      }

      return (
        <div className="row" key={sku.id}>
          <div className="col-md-2">
            <Img className="thumbnail"
              src={sku.images[0].src}
              accountName={this.props.accountName}
              alt="" title=""
              height="65" width="65"/>
          </div>
          <div className="col-md-7">
            <b>{ sku.name }</b>
            { price }
          </div>
        </div>
      );
    });

    return (
      <div>
        { skus }
      </div>
    );
  }
});

export default ProductSkuSelector;
