import React from 'react';
import { connect } from 'react-redux';
import { Form } from "semantic-ui-react";

// Renders either:
// 1. disabled dropdown menu
// 2. contextually relevant dropdown of districts in selected state
const renderDistrictInput = props => {
   if (props.districtList[0] === 'District') {
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
      const districtListOptions = props.districtList.map((option, i) => {
         return { key: i, value: option.NCES_district_id, text: option.LEA_name }
      });

      return (
         <Form.Dropdown
            search
            selection
            placeholder="District"
            value={props.districtValue}
            onChange={props.handleDistrictListChange}
            options={districtListOptions}
            label="District"
         />
      );
   }
}

const mapStateToProps = state => ({
   districtList: state.scopeOption.districtReducer,
});

export default connect(mapStateToProps)(renderDistrictInput);
