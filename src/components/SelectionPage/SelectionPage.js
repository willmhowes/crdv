import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment } from 'semantic-ui-react';
import { Component } from 'react';
import './SelectionPage.css';

class SelectionPage extends Component {

   state = {
      stateValue: '',
      districtValue: '',
      schoolValue: '',
   }

   // Loads list of states after component mounts
   componentDidMount = () => {
      this.props.dispatch({ type: 'GET_STATE_LIST' });
   }

   // updates stateValue in local state
   // then dispatches request for list of relevant districts
   handleStateListChange = (event, { value }) => {
      this.props.dispatch({ type: 'GET_DISTRICT_LIST', payload: value });
      this.setState({
         stateValue: value,
      });
   }

   // updates districtValue in local state
   // then dispatches request for list of relevant schools
   handleDistrictListChange = (event, { value }) => {
      this.props.dispatch({ type: 'GET_SCHOOL_LIST', payload: value });
      this.setState({
         districtValue: value,
      });
   }

   // updates districtValue in local state
   handleSchoolListChange = (event, { value }) => {
      this.setState({
         schoolValue: value,
      });
   }

   // Renders either:
   // 1. loading dropdown menu
   // 2. list of states to select
   renderStateInput = () => {
      if (this.props.stateList[0] === 'state') {
         return (
            <Form.Dropdown
               search
               selection
               disabled
               options={[{ key: 0, value: null, text: null }]}
               text="State"
               label="State"
               loading
            />
         );
      } else {
         const stateListOptions = this.props.stateList.map((option, i) => {
            return { key: i, value: option.state, text: option.state_name }
         });

         return (
            <Form.Dropdown
               search
               selection
               placeholder="State"
               value={this.state.stateValue}
               onChange={this.handleStateListChange}
               options={stateListOptions}
               label="State"
            />
         );
      }
   }

   // Renders either:
   // 1. disabled dropdown menu
   // 2. contextually relevant dropdown of districts in selected state
   renderDistrictInput = () => {
      if (this.props.districtList[0] === 'District') {
         return (
            <Form.Dropdown
               search
               selection
               disabled
               options={[{ key: 0, value: null, text: null }]}
               placeholder="District"
               label="District"
            />
         );
      } else {
         const districtListOptions = this.props.districtList.map((option, i) => {
            return { key: i, value: option.NCES_district_id, text: option.LEA_name }
         });

         return (
            <Form.Dropdown
               search
               selection
               placeholder="District"
               value={this.state.districtValue}
               onChange={this.handleDistrictListChange}
               options={districtListOptions}
               label="District"
            />
         );
      }
   }

   // Renders either:
   // 1. disabled dropdown menu
   // 2. contextually relevant dropdown of schools in selected state
   renderSchoolInput = () => {
      if (this.props.schoolList[0] === 'School') {
         return (
            <Form.Dropdown
               search
               selection
               disabled
               fluid
               options={[{ key: 0, value: null, text: null }]}
               placeholder="School"
               label="School"
            />
         );
      } else {
         const schoolListOptions = this.props.schoolList.map((option, i) => {
            return { key: i, value: option.NCES_school_id, text: option.school_name }
         });

         return (
            <Form.Dropdown
               search
               selection
               fluid
               placeholder="School"
               value={this.state.schoolValue}
               onChange={this.handleSchoolListChange}
               options={schoolListOptions}
               label="School"
            />
         );
      }
   }

   render() {
      return (
         <section className="SelectionPage-section">
            <Segment>
               <h1>Hello</h1>
               <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                     {this.renderStateInput()}
                     {this.renderDistrictInput()}
                  </Form.Group>
                  {this.renderSchoolInput()}
               </Form>
            </Segment>
         </section>
      );
   }
}

const mapStateToProps = state => ({
   user: state.user,
   stateList: state.scopeOption.stateReducer,
   districtList: state.scopeOption.districtReducer,
   schoolList: state.scopeOption.schoolReducer,
});

export default connect(mapStateToProps)(SelectionPage);
