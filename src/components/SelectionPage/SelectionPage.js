import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Header } from 'semantic-ui-react';
import { Component } from 'react';
import './SelectionPage.css';

class SelectionPage extends Component {

   state = {
      stateValue: '',
      districtValue: '',
      schoolValue: '',
      datasetValue: '',
      allowContinue: false,
      currentScope: '',
   }

   handleSubmit = () => {
      const { stateValue, districtValue, schoolValue, currentScope } = this.state;
      const scopeInfo = { stateValue, districtValue, schoolValue };
      const payload = { currentScope, scopeInfo };
      this.props.dispatch({ type: 'GET_SPECIFIC_DATASET', payload: payload });
   }

   // Loads list of states after component mounts
   componentDidMount = () => {
      this.props.dispatch({ type: 'GET_STATE_LIST' });
   }

   // updates stateValue and scope in local state
   // then dispatches request for list of relevant districts
   handleStateListChange = (event, { value }) => {
      this.props.dispatch({ type: 'GET_DISTRICT_LIST', payload: value });
      this.setState({
         stateValue: value,
         currentScope: 'state'
      });
   }

   // updates districtValue and scope in local state
   // then dispatches request for list of relevant schools
   handleDistrictListChange = (event, { value }) => {
      this.props.dispatch({ type: 'GET_SCHOOL_LIST', payload: value });
      this.setState({
         districtValue: value,
         currentScope: 'district'
      });
   }

   // updates schoolValue and scope in local state
   // then dispatches request for list of relevant datasets
   handleSchoolListChange = (event, { value }) => {
      // destructures everything except schoolValue and currentScope
      // schoolValue is passed as the prop 'value'
      // currentScope isn't set until setState, which is after the dispatch
      const { stateValue, districtValue } = this.state;
      const scopeInfo = { stateValue, districtValue, schoolValue: value };
      const currentScope = 'school';
      const payload = { currentScope, scopeInfo };
      this.props.dispatch({ type: 'GET_DATASET_LIST', payload: payload });

      this.setState({
         schoolValue: value,
         currentScope: 'school',
         allowContinue: true,
      });
   }

   // updates datasetValue in local state
   handleDatasetListChange = (event, { value }) => {
      this.setState({
         datasetValue: value,
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

   renderDataInput = () => {
      if (!this.state.allowContinue) {
         return (
            <Form.Dropdown
               search
               selection
               disabled
               options={[{ key: 0, value: null, text: null }]}
               placeholder="Dataset"
               label="Dataset"
               loading
            />
         );
      } else {
         const DatasetOptions =
            [{
               key: 0,
               value: 'Discipline of Students without Disabilities',
               text: 'Discipline of Students without Disabilities'
            }];

         return (
            <Form.Dropdown
               search
               selection
               placeholder="Dataset"
               value={this.state.datasetValue}
               onChange={this.handleDatasetListChange}
               options={DatasetOptions}
               label="Dataset"
            />
         );
      }
   }

   handleTESTRender = () => {
      if (this.props.testData[0] === 'Data') {
         return (
            <div>
               <h4>Data loads here...</h4>
            </div>
         );
      } else {
         return (
            <div>
               {JSON.stringify(this.props.testData)}
            </div>
         )
      }
   }

   render() {
      return (
         <section className="SelectionPage-section">
            <Segment>
               <Header as='h1'>Select Scope of Data</Header>
               <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                     {this.renderStateInput()}
                     {this.renderDistrictInput()}
                  </Form.Group>
                  {this.renderSchoolInput()}
                  {this.renderDataInput()}

                  {this.state.allowContinue ?
                     <Form.Button
                        type="submit"
                        primary
                        fluid>
                        Continue
                  </Form.Button> :
                     <Form.Button
                        type="button"
                        primary
                        disabled
                        fluid>
                        Continue
                  </Form.Button>}

               </Form>
            </Segment>
            <Segment>
               {this.handleTESTRender()}
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
   testData: state.scopeOption.specificDatasetReducer,
   // yearList: state.scopeOption.yearReducer,
});

export default connect(mapStateToProps)(SelectionPage);
