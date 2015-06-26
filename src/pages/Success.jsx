import React from 'react';
import connectToStores from 'utils/connectToStores.js';

let Success = React.createClass({
  statics: {
    getStores() {
      return [
        storefront.flux.stores.CartStore
      ];
    }
  },

  render() {
    let orderForm = this.props.CartStore.get('orderForm');
    console.log(orderForm.items);
    const skuIdArray = orderForm.items.map(i => i.id);
    const qrCodeData = skuIdArray.join('%2C');
    const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?data=${qrCodeData}&size=290x290&margin=10`;
    return (
      <div className="container">
        <h2>Obrigado!</h2>
        <h4>Seu pedido foi confirmado.</h4>
        <img src={qrCodeSrc}></img>
        <h4>Para retirar seu pedido, apresente o código acima ao nosso caixa</h4>
      </div>
    );
  }
});

export default connectToStores(Success);
