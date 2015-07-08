import storefront from 'storefront';
import App from 'components/App';
import Img from 'components/Img';
import Home from 'pages/Home';
import Product from 'pages/Product';
import Checkout from 'pages/Checkout';
import Success from 'pages/Success';

require('styles/style.less');

if (!window.Intl) {
  window.Intl = require('intl');
}
const appSuffix = '@vtex.storefront-theme';

storefront.export('App', App);
storefront.export('Img' + appSuffix, Img);
storefront.export('HomePage' + appSuffix, Home);
storefront.export('ProductPage' + appSuffix, Product);
storefront.export('CheckoutPage' + appSuffix, Checkout);
storefront.export('SuccessPage' + appSuffix, Success);


window.isAdmin = true;

function loader(name, load) {
  load((component) =>
    storefront.export(`${name}${appSuffix}`, component)
  );
}

if (window.isAdmin) {
  let adminComponents = ['AdminShelf', 'AdminFoo'];
  adminComponents.forEach((name) => {
    let load = require('bundle!./components/admins/' + name);
    loader(name, load);
  });
}


// Enable react hot loading with external React
// see https://github.com/gaearon/react-hot-loader/tree/master/docs#usage-with-external-react
if (module.hot) {
  window.RootInstanceProvider = require('react-hot-loader/Injection').RootInstanceProvider;
}
