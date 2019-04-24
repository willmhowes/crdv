import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './Nav.css';

class Nav extends Component {

  handleDropdownClick = (event) => {
    if (event.target.getAttribute('name') === 'account') {
      console.log('account button activated');
    } else if (event.target.getAttribute('name') === 'log_out') {
      console.log('logout button activated');
    }
  }

  handleClick = (event) => {
    if (event.target.getAttribute('value') === 'CRDVisualizer') {
      console.log('home button activated');
    } else if (event.target.getAttribute('value') === 'faq') {
      console.log('faq button activated');
    } else if (event.target.getAttribute('value') === 'login/register') {
      console.log('login/register button activated');
    }
  }

  render() {
    return (
      <Menu size="large">
        <Menu.Item
          value='CRDVisualizer'
          onClick={this.handleClick}
        >
          CRDVisualizer
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            onClick={this.handleClick}
            value="faq"
          >
            FAQ
          </Menu.Item>
          
          {this.props.user.id ?
            <Dropdown item text={this.props.user.username}>
              <Dropdown.Menu>
                <Dropdown.Item
                  name="account"
                  onClick={this.handleDropdownClick}
                >
                  Account
                </Dropdown.Item>
                <Dropdown.Item
                  name="log_out"
                  onClick={this.handleDropdownClick}
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> :

            <Menu.Item
              onClick={this.handleClick}
              value="login/register"
            >
              Login / Register
            </Menu.Item>
          }
        </Menu.Menu>
      </Menu>
    )
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withRouter(Nav));
