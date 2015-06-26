import React from 'react';
import kebabCase from 'lodash/string/kebabCase';

let ProductTitle = React.createClass({
  render() {
    let product = this.props.product;
    let brandURL = '/' + kebabCase(product.brand.slug) + '/b';

    return (
      <div className="ds-product-title">
        <h1 className="ds-product-name">{product.name}</h1>
        <div className="ds-brand">
          por <a title={product.brand.name} href={brandURL}>{product.brand.name}</a>
        </div>
      </div>
    );
  }
});

export default ProductTitle;
