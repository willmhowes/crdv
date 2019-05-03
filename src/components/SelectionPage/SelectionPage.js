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
      let {
         stateValue,
         districtValue,
         schoolValue,
         datasetValue,
         datasetYearValue
      } = payload.scopeInfo;

      console.log('currentScope:', currentScope);

      // Convert datasetValue into a string with underscores
      let datasetValueArray = datasetValue.split(' ');
      let datasetValueMod = datasetValueArray.join('_');
      // Save url into a string
      let urlString;
      if (currentScope === 'state') {
         urlString = `/visualizer/${currentScope}/${datasetValueMod}/${datasetYearValue}/${stateValue}`;
      } else if (currentScope === 'district') {
         urlString = `/visualizer/${currentScope}/${datasetValueMod}/${datasetYearValue}/${stateValue}/${districtValue}`;
      } else if (currentScope === 'school') {
         urlString = `/visualizer/${currentScope}/${datasetValueMod}/${datasetYearValue}/${stateValue}/${schoolValue}`;
      }

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

      // save scope information in object scopeInfo
      const scopeInfo = {
         stateValue,
         districtValue,
         schoolValue,
         datasetValue,
         datasetYearValue,
      };

      // Save data in object payload and send as arguement to goToVisualizer
      const payload = { currentScope, scopeInfo };
      this.goToVisualizer(payload);
   }

   componentDidMount = () => {
      this.props.dispatch({ type: 'GET_STATE_LIST' });
   }

   render() {
      return (
         <section className="SelectionPage-section">
            <Segment>
               <Header as='h2'>Scope Selection</Header>
               <Form>
                  <Form.Group>
                     <RenderStateInput isRequired={true} label="State" />
                     <RenderDistrictInput label="District" />
                  </Form.Group>
                  <RenderSchoolInput label="School" fluid={true} />
               </Form>
            </Segment>

            <Segment>
               <Header as='h2'>Dataset Selection</Header>
               <Form onSubmit={this.handleSubmit}>
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
