import React, { PropTypes } from 'react';
import { State } from 'react-router';
import connectToStores from '../../utils/connectToStores';
import Facet from './Facet';
import _isEqual from 'lodash/lang/isEqual';
import SearchParamsMixin from '../../utils/SearchParamsMixin';
import { IntlMixin } from "react-intl";

let Facets = React.createClass({
  mixins: [ State, SearchParamsMixin, IntlMixin ],

  propTypes: {
    flux: PropTypes.object.isRequired
  },

  statics: {
    getStores(props) {
      return [
        props.flux.stores.SearchStore,
        props.flux.stores.ShopStore
      ];
    },

    getPropsFromStores(props) {
      return {
        search: props.flux.stores.SearchStore.getState(),
        shop: props.flux.stores.ShopStore.getState()
      };
    }
  },

  requestFacets(props = this.props) {
    let propsSearch = this.getSearchObject(props.search);
    let routeSearch = this.getSearchObjectBasedOnRoute(this.getParams(), this.getQuery());

    if (!_isEqual(propsSearch, routeSearch) && props.search.loadingFacets === false) {
      routeSearch.accountName = props.shop.accountName;
      props.flux.actions.SearchActions.requestFacets(routeSearch);
    }
  },

  componentWillMount() {
    if (!this.props.search.facets) {
      let propsSearch = this.getSearchObject(this.props.search);
      propsSearch.accountName = this.props.shop.accountName;
      this.props.flux.actions.SearchActions.requestFacets(propsSearch);
    }
  },

  componentWillReceiveProps() {
    this.requestFacets();
  },

  render() {
    let facets = this.props.search.facets || {};
    let cleanFacets = [];

    if (facets.categories || facets.filters || facets.brands) {
      cleanFacets = facets.categories.map((facet) => {
        return {
          heading: facet.name,
          options: facet.children,
          type: "category"
        };
      });

      cleanFacets.concat(facets.filters.map((facet) => {
        return {
          heading: facet.key,
          options: facet.value,
          type: "specification"
        };
      }));

      cleanFacets.push({
        heading: this.getIntlMessage('brands'),
        options: facets.brands,
        type: "brand"
      });
    }

    return (
      <div className="ds-facets">
        { cleanFacets.map((facet) =>
          <Facet facet={facet} key={facet.heading} route={this.props.route}/>
        )}
      </div>
    );
  }
});

export default connectToStores(Facets);
