import React from 'react';
import kebabCase from 'lodash/string/kebabCase';
import { Link, State } from 'react-router';

let Facet = React.createClass({
  mixins: [ State ],

  createQueryString(option) {
    let queryString = this.getQuery() || {};
    queryString[this.props.facet.type] = option.slug;
    return queryString;
  },

  render() {
    let content;
    let facet = this.props.facet;

    if (facet.options.length > 0) {
      content = (
        <div className="ds-facet-body">
          <ul className="ds-facet-list list-unstyled">
          { facet.options.map((option) =>
            <li key={ option.href }>
              <Link to={this.props.route} params={this.getParams()} query={this.createQueryString(option)} className="ds-facet-link" >
                <span className="ds-facet-name">{ option.name }</span> <span className="ds-facet-quantity">({ option.quantity })</span>
              </Link>
            </li>
          )}
          </ul>
        </div>
      );
    }
    return (
      <div className="ds-facet">
        <div className="ds-facet-heading">{ facet.heading }</div>
        { content }
      </div>
    );
  }
});

export default Facet;
