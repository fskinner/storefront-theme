import React from 'react';

let Img = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired,
    accountName: React.PropTypes.string.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  },

  getBaseUrl({ accountName }) {
    return `http://${accountName}.vteximg.com.br`;
  },

  onMouseOver() {
    if (this.props.prefetchOnHover) {
      let path = this.props.src.replace('#width#', 490).replace('#height#', 490);
      path = this.getBaseUrl(this.props) + path;
      const prefetchImage = new Image();
      prefetchImage.src = path;
    }
  },

  render() {
    let path = this.props.src.replace('#width#', this.props.width).replace('#height#', this.props.width);
    path = this.getBaseUrl(this.props) + path;

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
