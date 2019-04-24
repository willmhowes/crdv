import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Header } from 'semantic-ui-react';
import './LoginPage.css';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <div className="LoginPage-form">
        <Segment>
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}
        </Segment>

        <Segment >
          <Header as="h1">
            Login
          </Header>
          <Form onSubmit={this.login}>
            <Form.Input
              label="Username" type="text"
              name="username" value={this.state.username}
              placeholder="Username"
              onChange={this.handleInputChangeFor('username')}
            />
            <Form.Input
              label="Password" type="password"
              name="password" value={this.state.password}
              placeholder="Password"
              onChange={this.handleInputChangeFor('password')}
            />
            <Form.Button
              primary
              fluid
              type="submit"
              name="submit">
              Log in
            </Form.Button>
            <Form.Button
              type="button"
              basic
              secondary
              fluid
              size="small"
              onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}>
              Register
            </Form.Button>
          </Form>


        </Segment>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
