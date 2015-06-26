import React from 'react';

let ProductSpecification = React.createClass({
  render() {
    let product = this.props.product;

    let spec = product.properties.map((prop) =>
      <tr key={ prop.facet.name }>
        <th>{ prop.facet.name }</th>
        <td>{ prop.facet.values[0].replace('\r\n', '<br/>') }</td>
      </tr>
    );
    return (
      <div className="ds-product-specification row">
        <h4 id="specification" className="ds-product-specification-title col-md-12">Especificações</h4>
        <div className="ds-product-specification-value col-md-12">
          <table className="ds-product-specification-table table table-striped">
            <tbody>
            { spec }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
});

export default ProductSpecification;
