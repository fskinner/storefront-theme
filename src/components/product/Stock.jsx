import React from 'react';

let ProductStock = React.createClass({
  render() {
    let sku = this.props.product.items[0];

    let stock;
    if (sku.sellers[0].offer.availableQuantity > 0) {
      if (sku.sellers[0].offer.availableQuantity < 6) {
        stock = <span className="ds-product-in-stock">Apenas { sku.sellers[0].offer.availableQuantity } em estoque.</span>;
      } else {
        stock = <span className="ds-product-in-stock">Em Estoque.</span>;
      }
    } else {
      stock = <span className="ds-product-no-stock">Sem Estoque.</span>;
    }

    return (
      <div className="ds-product-stock">
        { stock }
      </div>
    );
  }
});

export default ProductStock;
