import storefront from 'storefront';
import React from 'react';
import Img from '../Img';
import { FormattedNumber } from 'react-intl';
import { Button } from 'react-bootstrap';

let ShelfItem = React.createClass({

  addToCart() {
    let orderForm = this.props.orderForm;
    let sampleProduct = this.props.product.skus[0];
    let item = {
      'id': sampleProduct.id,
      quantity: 1,
      'seller': sampleProduct.offers[0].seller.id
    };

    storefront.flux.actions.CartActions.addToCart(orderForm.orderFormId, [item]);
  },

  render() {
    let product = this.props.product || '';
    let name = product.name;
    let sampleProduct = product.skus[0];
    let price = sampleProduct.offers[0].price;
    let imageSrc = sampleProduct.images[0].src;

    return (
      <div className="ds-shelf-item">
        <div className="full-length ds-shelf-item-image-container">
          <Img className="full-length ds-shelf-item-image"
            src={imageSrc}
            width={200}
            height={200}
            accountName={this.props.accountName}
            alt="" title=""/>
        </div>
        <div className="full-length ds-product-info container">
          <h3 className="ds-shelf-item-name" title={ name }>
            { name }
          </h3>
          <p>{ product.description }</p>
          <div className="row ds-product-bottom">
            <h4 className="col-xs-6 ds-shelf-item-price">
              <FormattedNumber style="currency" value={price} currency={this.props.currency} />
            </h4>
            <div className="col-xs-6 ds-add-to-cart">
              <Button onClick={this.addToCart}>Pedir</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default ShelfItem;
