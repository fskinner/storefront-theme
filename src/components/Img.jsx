import React from 'react';

let Img = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired,
    accountName: React.PropTypes.string.isRequired
  },

  onMouseOver() {
    if (this.props.prefetchOnHover) {
      const baseUrl = "http://"+this.props.accountName+".vteximg.com.br";
      let path = this.props.src.replace('#width#', 490).replace('#height#', 490);
      path = baseUrl + path;
      const prefetchImage = new Image();
      prefetchImage.src = path;
    }
  },

  render() {
    let baseUrl = "http://"+this.props.accountName+".vteximg.com.br";
    let path = this.props.src.replace('#width#', this.props.width).replace('#height#', this.props.width);
    path = baseUrl + path;

    return (
      <img
        onMouseOver={this.onMouseOver}
        className={this.props.className}
        src={path}
        alt={this.props.alt}
        title={this.props.title} />
    );
  }

});

export default Img;
