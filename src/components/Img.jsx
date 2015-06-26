import React from 'react';

let Img = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired,
    accountName: React.PropTypes.string.isRequired
  },

  render() {
    let baseUrl = "http://"+this.props.accountName+".vteximg.com.br";
    let path = this.props.src.replace('-#width#-#height#', '');
    path = baseUrl + path;

    return (
      <img
        className={this.props.className}
        src={path}
        alt={this.props.alt}
        title={this.props.title} />
    );
  }

});

export default Img;
