import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Component } from 'react';

class SelectionPage extends Component {

   componentDidMount = () => {
      this.props.dispatch({ type: 'GET_STATE_LIST' });
      console.log('in selectionpage');

   }

   render() {
      // const { name, email, submittedName, submittedEmail } = this.state;
      return (
         <div>
            <h1>Hello</h1>
            {JSON.stringify(this.props.stateList)}
         </div>
      );
   }
}


// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
   user: state.user,
   stateList: state.scopeOption.stateReducer,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SelectionPage);
