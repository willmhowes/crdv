import React from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown } from "semantic-ui-react";

// Renders either:
// 1. loading dropdown menu
// 2. list of states to select
const renderStateInput = props => {
   if (props.stateList[0] === 'state') {
      return (
         <Form.Field
            control={Dropdown}
            // Checks if property isRequired was passed as true
            required={!!props.isRequired}
            search
            selection
            options={[{ key: 0, value: null, text: null }]}
            placeholder="State"
            label="State"
            disabled
            loading
         />
      );
   } else {
      const stateListOptions = props.stateList.map((option, i) => {
         return { key: i, value: option.state, text: option.state_name }
      });

      return (
         <Form.Field
            control={Dropdown}
            // Checks if property isRequired was passed as true
            required={!!props.isRequired}
            search
            selection
            placeholder="State"
            value={props.stateValue}
            onChange={props.handleStateListChange}
            options={stateListOptions}
            label="State"
         />
      );
   }
}

const mapStateToProps = state => ({
   stateList: state.scopeOption.stateReducer,
});

export default connect(mapStateToProps)(renderStateInput);
