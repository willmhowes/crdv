import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment } from 'semantic-ui-react';
import { Component } from 'react';
import './SelectionPage.css';

class SelectionPage extends Component {

   state = {
      stateValue: '',
   }

   componentDidMount = () => {
      this.props.dispatch({ type: 'GET_STATE_LIST' });
      console.log('in selectionpage');
   }

   handleSubmit = () => {

   }

   handleStateListChange = (event, { value }) => {
      this.props.dispatch({ type: 'GET_DISTRICT_LIST', payload: value });
      this.setState({
         stateValue: value,
      });
   }

   renderStateInput = () => {
      if (this.props.stateList[0] === 'state') {
         return (
            <Form.Dropdown text='State' loading disabled />
         );
      } else {
         const stateListOptions = this.props.stateList.map(option => {
            return { key: option.state, value: option.state, text: option.state_name }
         });

         return (
            <Form.Dropdown
               fluid
               search
               selection
               placeholder='State'
               value={this.state.value}
               onChange={this.handleStateListChange}
               options={stateListOptions}
            />
         );
      }
   }

   renderDistrictInput = () => {
      if (this.props.districtList[0] === 'District') {
         return (
            <Form.Dropdown
               fluid
               search
               selection
               disabled
               placeholder='District'
            />
         );
      } else {
         const districtListOptions = this.props.districtList.map(option => {
            return { key: option.NCES_district_id, value: option.NCES_district_id, text: option.LEA_name }
         });

         return (
            <Form.Dropdown
               fluid
               search
               selection
               placeholder='State'
               options={districtListOptions}
            />
         );
      }
   }

   render() {

      // const { name, email, submittedName, submittedEmail } = this.state;
      return (
         <Segment>
            <div className="SelectionPage-div">
               <h1>Hello</h1>
               {JSON.stringify(this.state.stateValue)}
               <br />
               <br />
               <Form onSubmit={this.handleSubmit}>
                  {this.renderStateInput()}
                  <br />
                  {this.renderDistrictInput()}
                  <br />
                  <Form.Button type="submit">Submit</Form.Button>
               </Form>
            </div >
         </Segment>
      );
   }
}


// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
   user: state.user,
   stateList: state.scopeOption.stateReducer,
   districtList: state.scopeOption.districtReducer,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(SelectionPage);
