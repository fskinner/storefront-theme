import React from 'react';

let ProductAddCart = React.createClass({
  handleAddToCart() {
    let product = this.props.product;
    let sku = product.skus[0];
    let qty = React.findDOMNode(this.refs.quantity).value;
    this.props.addToCart(sku.id, qty, 1);
  },

  render() {
    let product = this.props.product;
    let sku = product.skus[0];
    let addToCart;
    let loading;
    if (sku.offers[0].availability > 0) {
      let isAvailable;
      if (sku.offers[0].availability > 1) {
        let maxQuantity = [];
        let j = sku.offers[0].availability;
        for (var i = 1; i <= 30 && i < j; i++) {
          maxQuantity.push(
            <option key={i}>{ i }</option>
          );
        }
        isAvailable = (
          <form className="ds-product-quantity">
            <label>
              Quant:
              <select ref="quantity">
                {maxQuantity}
              </select>
            </label>
          </form>
        );
      }
      addToCart = (
        <div className="ds-product-add-cart">
          {isAvailable}

          <a onClick={this.handleAddToCart} className="ds-product-add-cart-btn btn btn-block btn-success">
            <i className="fa fa-shopping-cart"></i> Adicionar ao carrinho
          </a>
        </div>
      );

      loading = (
        <div className="ds-product-add-cart">
          {isAvailable}

          <a className="ds-product-add-cart-btn btn btn-block btn-success">
            <i className="fa fa-shopping-cart"></i> ...
          </a>
        </div>
      );
    }

    return (
      <div>
        {
          this.props.cartLoading ?
          loading :
          addToCart
        }
      </div>
    );
  }
});

export default ProductAddCart;
