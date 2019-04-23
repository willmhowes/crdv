// import React from 'react';
// import { connect } from 'react-redux';
// import { Form } from 'semantic-ui-react';
// import { Component } from 'react';

// class SelectionPage extends Component {

//    state = { name: '', email: '', submittedName: '', submittedEmail: '' }

//    handleChange = (e, { name, value }) => this.setState({ [name]: value })

//    handleSubmit = () => {
//       const { name, email } = this.state
//       this.setState({ submittedName: name, submittedEmail: email })
//    }

//    render() {
//       const { name, email, submittedName, submittedEmail } = this.state;
//       return (
//          <div>
//             <Form onSubmit={this.handleSubmit}>
//                <Form.Group>
//                   <Form.Input placeholder='Name' name='name' value={name} onChange={this.handleChange} />
//                   <Form.Input
//                      placeholder='Email'
//                      name='email'
//                      value={email}
//                      onChange={this.handleChange}
//                   />
//                   <Form.Button content='Submit' />
//                </Form.Group>
//             </Form>
//             <strong>onChange:</strong>
//             <pre>{JSON.stringify({ name, email }, null, 2)}</pre>
//             <strong>onSubmit:</strong>
//             <pre>{JSON.stringify({ submittedName, submittedEmail }, null, 2)}</pre>
//          </div>
//       );
//    }
// }


// // Instead of taking everything from state, we just want the user info.
// // if you wanted you could write this code like this:
// // const mapStateToProps = ({user}) => ({ user });
// const mapStateToProps = state => ({
//    user: state.user,
// });

// // this allows us to use <App /> in index.js
// export default connect(mapStateToProps)(SelectionPage);
