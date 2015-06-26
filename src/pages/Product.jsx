import React, { PropTypes } from 'react';
import connectToStores from 'utils/connectToStores.js';

import ProductTitle from 'components/product/Title';
import ProductPrice from 'components/product/Price';
import ProductStock from 'components/product/Stock';
import ProductSeller from 'components/product/Seller';
import ProductExcerpt from 'components/product/Excerpt';
import ProductSkuSelector from 'components/product/SkuSelector';
import ProductShare from 'components/product/Share';
import ProductAddCart from 'components/product/AddCart';
import ProductDescription from 'components/product/Description';
import ProductSpecification from 'components/product/Specification';
import Img from 'components/Img';
import { PureRenderMixin } from 'react/lib/ReactComponentWithPureRenderMixin';

let Product = React.createClass({
  mixins: [ PureRenderMixin ],
  statics: {
    getStores() {
      return [
        storefront.flux.stores.ProductStore,
        storefront.flux.stores.ShopStore,
        storefront.flux.stores.CartStore
      ];
    }
  },

  getProduct() {
    const productSlug = this.props.params.product;
    return this.props.ProductStore.get(productSlug);
  },

  addToCart(id, qty, seller) {
    let orderForm = this.props.CartStore.get('orderForm');
    let item = {
      'id': id,
      quantity: qty,
      'seller': seller
    };

    storefront.flux.actions.CartActions.addToCart(orderForm.orderFormId, [item]);
  },

  componentDidMount() {
    const product = this.getProduct();

    // TODO look for details that are not on the search results
    if (!product) {
      storefront.flux.actions.ProductActions.requestProduct({
        accountName: this.props.ShopStore.get('accountName'),
        product: this.props.params.product
      });
    }
  },

  render() {
    const product = this.getProduct();
    const ShopStore = this.props.ShopStore;
    const CartStore = this.props.CartStore;

    if (!product) {
      return (
        <div>loading...</div>
      );
    }

    const sku = product.skus[0];
    return (
      <div className="ds-main container-fluid">

        <div className="ds-product-info row">
          <div className="ds-product-image-container col-md-4">
            <Img className="ds-product-image img-responsive"
              src={ sku.images[0].src }
              accountName={ ShopStore.get('accountName') }
              alt={ product.name } title={ product.name }
              height="490" width="490"/>
          </div>
          <div className="ds-product-main-info col-md-6">
            <ProductTitle product={product} />

            { product.skus.size == 1 ?
              <div>
                <ProductPrice product={product} currency={ShopStore.get('currency')} />
                <ProductStock product={product} />
                <ProductSeller product={product} />

                <ProductExcerpt product={product} />
              </div>
              :
              <ProductSkuSelector
                product={product}
                currency={ShopStore.get('currency')}
                accountName={ShopStore.get('accountName')} />
            }
          </div>
          <div className="ds-product-sidebar col-md-2">
            <div className="row">
              <ProductShare product={product} />
            </div>
            <div className="row">
              <ProductAddCart product={product} addToCart={this.addToCart}
                              cartLoading={CartStore.get('addLoading')} />
            </div>
          </div>
        </div>

        <ProductDescription product={product} />

        <ProductSpecification product={product} />
      </div>
    );
  }
});

export default connectToStores(Product);
