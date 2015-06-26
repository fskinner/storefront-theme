import storefront from 'storefront';
import App from './components/App';
import Home from './pages/Home';
import Product from './pages/Product';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Checkout from './pages/Checkout';
import Success from './pages/Success';

require('styles/style.less');

if (!window.Intl) {
  window.Intl = require('intl');
}
const appSuffix = '@vtex.storefront-theme';

storefront.export('App', App);
storefront.export('HomePage' + appSuffix, Home);
storefront.export('ProductPage' + appSuffix, Product);
storefront.export('BebidasPage' + appSuffix, Bebidas);
storefront.export('ComidasPage' + appSuffix, Comidas);
storefront.export('CheckoutPage' + appSuffix, Checkout);
storefront.export('SuccessPage' + appSuffix, Success);

// Enable react hot loading with external React
// see https://github.com/gaearon/react-hot-loader/tree/master/docs#usage-with-external-react
if (module.hot) {
  window.RootInstanceProvider = require('react-hot-loader/Injection').RootInstanceProvider;
}
