import React from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown } from "semantic-ui-react";

// Renders either:
// 1. disabled dropdown menu
// 2. dropdown of available years matching the selected dataset
const renderDatasetYearInput = props => {
   if (!props.showYearSelection) {
      return (
         <Form.Field
            control={Dropdown}
            // Checks if property isRequired was passed as true
            required={!!props.isRequired}
            search
            selection
            fluid
            disabled
            options={[{ key: 0, value: null, text: null }]}
            placeholder="Year"
            label="Year"
         />
      );
   } else {
      const datasetYearOptions = [];
      const dataSetList = props.datasetList;
      for (let i in dataSetList) {
         if (dataSetList[i].table_name === props.datasetValue) {
            datasetYearOptions.push({
               key: i + 1,
               value: dataSetList[i].Year,
               text: dataSetList[i].Year,
            });
         }
      }

      return (
         <Form.Field
            control={Dropdown}
            // Checks if property isRequired was passed as true
            required={!!props.isRequired}
            search
            selection
            fluid
            placeholder="Year"
            value={props.datasetYearValue}
            onChange={props.handleDatasetYearListChange}
            options={datasetYearOptions}
            label="Year"
         />
      );
   }
}

const mapStateToProps = state => ({
   datasetList: state.scopeOption.datasetListReducer,
});

export default connect(mapStateToProps)(renderDatasetYearInput);
