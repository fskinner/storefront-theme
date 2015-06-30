import React, { PropTypes } from 'react';
import connectToStores from 'utils/connectToStores';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import DocumentTitle from 'react-document-title';
import { RouteHandler, State } from 'react-router';
import Header from './header/Header';
import Footer from './footer/Footer';
import { IntlMixin } from "react-intl";

let App = React.createClass({
  mixins: [ IntlMixin, State ],

  statics: {
    getStores() {
      return [
        storefront.flux.stores.ShopStore,
        storefront.flux.stores.CartStore
      ];
    }
  },

  getHandlerKey: function () {
    var childName = this.getRoutes()[0].name;
    var id = this.getParams().id;
    var key = childName+id;
    return key;
  },

  componentWillMount() {
    storefront.flux.actions.CartActions.requestCart();
  },

  render() {
    let accountName = this.props.ShopStore.get('accountName');
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

export default connectToStores(App);