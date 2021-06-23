import React from 'react';
import { Component } from 'react';
import './Header.css';
import logo from '../images/Color.svg';

class Header extends Component {
  state = {
    search: '',
  };

  handleInputChange = (event) => {
    const search = event.target.value;
    this.setState({ search });
    this.props.searchItem(search);
  };

  render() {
    return (
      <header>
        <div className="header">
          <img className="logo" src={logo} alt={'logo'} />
          <div className="header__search">
            <div className="search_icon" aria-hidden="true"></div>
            <input
              className="search_input"
              type="search"
              placeholder="Search task for to do"
              onChange={this.handleInputChange}
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;