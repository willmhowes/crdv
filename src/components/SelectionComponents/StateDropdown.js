import { Form } from "react-chartjs-2";

// Renders either:
// 1. loading dropdown menu
// 2. list of states to select
renderStateInput = (props, handleStateListChange) => {
   if (props.stateList[0] === 'state') {
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
      const stateListOptions = props.stateList.map((option, i) => {
         return { key: i, value: option.state, text: option.state_name }
      });

      return (
         <Form.Dropdown
            search
            selection
            placeholder="State"
            value={this.state.stateValue}
            onChange={handleStateListChange}
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
