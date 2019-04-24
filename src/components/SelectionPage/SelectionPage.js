import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Component } from 'react';

class SelectionPage extends Component {

   state = { name: '', email: '', submittedName: '', submittedEmail: '' }

   handleChange = (e, { name, value }) => this.setState({ [name]: value })

   handleSubmit = () => {
      const { name, email } = this.state
      this.setState({ submittedName: name, submittedEmail: email })
   }

   render() {
      const { name, email, submittedName, submittedEmail } = this.state;
      return (
         <div>

         </div>
      );
   }
}


// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
   user: state.user,
   stateList: state.scopeOption.stateList,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SelectionPage);
