import React from 'react';

let ProductDescription = React.createClass({
  render() {
    let product = this.props.product;
    return (
      <div className="ds-product-description row">
        <h4 id="description" className="ds-product-description-title col-md-12">Descrição do produto</h4>
        <div className="ds-product-description-value col-md-12">
          { product.description }
        </div>
      </div>
    );
  }
});

export default ProductDescription;
