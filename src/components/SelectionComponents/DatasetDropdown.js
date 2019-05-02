import React from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown } from "semantic-ui-react";

// Renders either:
// 1. disabled dropdown menu
// 2. dropdown of available datasets in selected scope
const renderDatasetInput = props => {
   if (!props.showDatasetSelection) {
      return (
         <Form.Field
            control={Dropdown}
            // Checks if property isRequired was passed as true
            required={!!props.isRequired}
            search
            selection
            disabled
            fluid
            options={[{ key: 0, value: null, text: null }]}
            placeholder="Dataset"
            label="Dataset"
         />
      );
   } else {
      const datasetOptions = [];
      const dataSetList = props.datasetList;
      const distinctList = [...new Set(dataSetList.map(x => x.table_name))];

      for (let i in distinctList) {
         datasetOptions.push({
            key: i + 1,
            value: distinctList[i],
            text: distinctList[i],
         });
      }

      return (
         <Form.Field
            control={Dropdown}
            // Checks if property isRequired was passed as true
            required={!!props.isRequired}
            search
            selection
            fluid
            placeholder="Dataset"
            value={props.datasetValue}
            onChange={props.handleDatasetListChange}
            options={datasetOptions}
            label="Dataset"
         />
      );
   }
}

const mapStateToProps = state => ({
   datasetList: state.scopeOption.datasetListReducer,
});

export default connect(mapStateToProps)(renderDatasetInput);
