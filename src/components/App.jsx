import React from 'react';
import storefront from 'storefront';
import DocumentTitle from 'react-document-title';
import { RouteHandler, State } from 'react-router';
import Header from './header/Header';
import Footer from './footer/Footer';
import { IntlMixin } from 'react-intl';

let App = React.createClass({
  mixins: [ IntlMixin, State ],

  getHandlerKey: function () {
    var childName = this.getRoutes()[0].name;
    var id = this.getParams().id;
    return childName + id;
  },

  componentWillMount() {
    storefront.flux.actions.CartActions.requestCart();
  },

  render() {
    let accountName = storefront.flux.stores.ShopStore.state.get('accountName');
    return (
      <DocumentTitle title='Dreamstore'>
        <div className={'ds-' + accountName}>
          <Header />
          <div className="page-perspective">
            <RouteHandler key={this.getHandlerKey()}/>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
});

export default App;
