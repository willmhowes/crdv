import { combineReducers } from 'redux';

const stateReducer = (state = ['State'], action) => {
   switch (action.type) {
      case 'SET_STATE_LIST':
         return action.payload;
      default:
         return state;
   }
};

const districtReducer = (state = ['District'], action) => {
   switch (action.type) {
      case 'SET_DISTRICT_LIST':
         return action.payload;
      default:
         return state;
   }
};

const schoolReducer = (state = ['School'], action) => {
   switch (action.type) {
      case 'SET_SCHOOL_LIST':
         return action.payload;
      default:
         return state;
   }
};

const datasetListReducer = (state = ['Dataset_List'], action) => {
   switch (action.type) {
      case 'SET_DATASET_LIST':
         return action.payload;
      default:
         return state;
   }
};

const specificDatasetReducer = (state = ['Data'], action) => {
   switch (action.type) {
      case 'SET_SPECIFIC_DATASET':
         return action.payload;
      default:
         return state;
   }
};

// const yearReducer = (state = ['Year'], action) => {
//    switch (action.type) {
//       case 'SET_DATASET_LIST_YEAR':
//          return action.payload;
//       default:
//          return state;
//    }
// };

const rootReducer = combineReducers({
   stateReducer,
   districtReducer,
   schoolReducer,
   datasetListReducer,
   specificDatasetReducer,
   // yearReducer,
});

export default rootReducer;
