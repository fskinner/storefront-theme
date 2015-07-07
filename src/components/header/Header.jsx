import React from 'react';
import { Navigation } from 'react-router';
import Style from './header.less'; // eslint-disable-line
import {
  Navbar, Nav, NavItem
} from 'react-bootstrap';

let Header = React.createClass({
  mixins: [ Navigation ],
  render() {
    return (
      <Navbar staticTop={true} brand='Comuna' inverse toggleNavKey={0}>
        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
          <NavItem eventKey='1' onClick={() => this.transitionTo('home')}>Home</NavItem>
        </Nav>
      </Navbar>
    );
  }
});

export default Header;
