import React from 'react';

let ProductExcerpt = React.createClass({
  render() {
    let product = this.props.product;

    let description;
    if (product.description.size > 300) {
      let excerpt = product.description.slice(0, 400);
      description = (
        <div>
          { excerpt }
          <a href="#description" className="ds-product-read-description">Leia mais</a>
        </div>
      );
    } else {
      description = product.description;
    }

    return (
      <div className="ds-product-excerpt">
        <h4 className="ds-product-excerpt-title">Descrição</h4>
        { description }
      </div>
    );
  }
});

export default ProductExcerpt;
