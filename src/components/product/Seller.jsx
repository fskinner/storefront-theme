import React from 'react';

let ProductSeller = React.createClass({
  render() {
    let sku = this.props.product.items[0];
    return (
      <div className="ds-product-seller">
        Fornecido e entregue por { sku.sellers[0].name }.
      </div>
    );
  }
});

export default ProductSeller;
