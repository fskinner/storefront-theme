import React from 'react';
import { Link } from 'react-router';
import Style from './header.less';
import {
  Navbar, Nav,
  DropdownButton,
  MenuItem,
  Grid, Row, Col
} from 'react-bootstrap';

let Header = React.createClass({
  render() {
    return (
      <div>
        <Navbar brand='Comuna'>
          <Nav>
            <DropdownButton title='Menu'>
              <Link to="home">
                <MenuItem>Home</MenuItem>
              </Link>
            </DropdownButton>
          </Nav>
        </Navbar>
      </div>
    );
  }
});

export default Header;
