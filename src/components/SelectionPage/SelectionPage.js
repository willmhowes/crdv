import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Header } from 'semantic-ui-react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './SelectionPage.css';

import RenderStateInput from '../SelectionComponents/StateDropdown';
import RenderDistrictInput from '../SelectionComponents/DistrictDropdown';
import RenderSchoolInput from '../SelectionComponents/SchoolDropdown';
import RenderDatasetInput from '../SelectionComponents/DatasetDropdown';
import RenderDatasetYearInput from '../SelectionComponents/DatasetYearDropdown';

class SelectionPage extends Component {

   // Function handles URL pathing
   goToVisualizer = (payload) => {
      let { currentScope } = payload;
      let { scopeIdentity, datasetValue, datasetYearValue } = payload.scopeInfo;

      // Convert datasetValue into a string with underscores
      let datasetValueArray = datasetValue.split(' ');
      let datasetValueMod = datasetValueArray.join('_');
      // Save url into a string
      let urlString = `/visualizer/${currentScope}/${scopeIdentity}/${datasetValueMod}/${datasetYearValue}`;
      // Push urlString onto history stack
      this.props.history.push(urlString);
   }

   // Handles activation of form submission button
   handleSubmit = () => {
      const {
         stateValue,
         districtValue,
         schoolValue,
         datasetValue,
         datasetYearValue,
         currentScope
      } = this.props;

      // Define scope as a variable scopeIdentity
      let scopeIdentity;
      if (currentScope === 'state') {
         scopeIdentity = stateValue;
      } else if (currentScope === 'district') {
         scopeIdentity = districtValue;
      } else if (currentScope === 'school') {
         scopeIdentity = schoolValue;
      }

      // save scope information in object scopeInfo
      const scopeInfo = { scopeIdentity, datasetValue, datasetYearValue };

      // Save data in object payload and send as arguement to goToVisualizer
      const payload = { currentScope, scopeInfo };
      this.goToVisualizer(payload);
   }

   // Loads list of states after component mounts
   componentDidMount = () => {
      this.props.dispatch({ type: 'GET_STATE_LIST' });
   }

   render() {
      return (
         <section className="SelectionPage-section">
            <Segment>
               <Header as='h1'>Select Scope of Data</Header>

               <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                     <RenderStateInput isRequired={true} />
                     <RenderDistrictInput />
                  </Form.Group>

                  <RenderSchoolInput />

                  <Form.Group widths="equal">
                     <RenderDatasetInput isRequired={true} />
                     <RenderDatasetYearInput isRequired={true} />
                  </Form.Group>

                  {this.props.allowContinue ?
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
                     </Form.Button>
                  }

               </Form>
            </Segment>
         </section>
      );
   }
}

const mapStateToProps = state => ({
   user: state.user,
   stateValue: state.selectedScope.scopeStateReducer,
   districtValue: state.selectedScope.scopeDistrictReducer,
   schoolValue: state.selectedScope.scopeSchoolReducer,
   datasetValue: state.selectedScope.scopeDatasetReducer,
   datasetYearValue: state.selectedScope.scopeDatasetYearReducer,
   currentScope: state.selectedScope.scopeCurrentLevelReducer,
   showDatasetSelection: state.selectionMenuProgress.showDatasetSelectionReducer,
   showYearSelection: state.selectionMenuProgress.showYearSelectionReducer,
   allowContinue: state.selectionMenuProgress.allowContinueReducer,
});

export default connect(mapStateToProps)(withRouter(SelectionPage));
