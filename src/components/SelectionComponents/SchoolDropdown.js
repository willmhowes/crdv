import React from 'react';
import { connect } from 'react-redux';
import { Form } from "semantic-ui-react";

// Renders either:
// 1. disabled dropdown menu
// 2. contextually relevant dropdown of schools in selected state
const renderSchoolInput = props => {
   if (props.schoolList[0] === 'School') {
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
      const schoolListOptions = props.schoolList.map((option, i) => {
         return { key: i, value: option.NCES_school_id, text: option.school_name }
      });

      return (
         <Form.Dropdown
            search
            selection
            fluid
            placeholder="School"
            value={props.schoolValue}
            onChange={props.handleSchoolListChange}
            options={schoolListOptions}
            label="School"
         />
      );
   }
}

const mapStateToProps = state => ({
   schoolList: state.scopeOption.schoolReducer,
});

export default connect(mapStateToProps)(renderSchoolInput);
