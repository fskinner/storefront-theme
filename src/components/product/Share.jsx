import React from 'react';

let ProductShare = React.createClass({
  render() {
    let product = this.props.product;
    return (
      <div className="ds-product-social-share">
        <a className="ds-product-social-share-email" href="#" title="Compartilhar por e-mail">Compartilhar</a>&nbsp;
        <a className="ds-product-social-share-email-icon" href="#" title="Compartilhar por e-mail"><i className="fa fa-envelope-o"></i></a>&nbsp;
        <a className="ds-product-social-share-facebook" href="#" title="Compartilhar no Facebook"><i className="fa fa-facebook-official"></i></a>&nbsp;
        <a className="ds-product-social-share-twitter" href="#" title="Compartilhar no Twitter"><i className="fa fa-twitter"></i></a>
      </div>
    );
  }
});

export default ProductShare;
