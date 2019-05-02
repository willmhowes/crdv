import { combineReducers } from 'redux';

const scopeStateReducer = (state = [''], action) => {
   switch (action.type) {
      case 'SET_SCOPE_OF_STATE':
         return action.payload;
      default:
         return state;
   }
};

const scopeDistrictReducer = (state = ['scope_of_district'], action) => {
   switch (action.type) {
      case 'SET_SCOPE_OF_DISTRICT':
         return action.payload;
      default:
         return state;
   }
};

const scopeSchoolReducer = (state = ['scope_of_school'], action) => {
   switch (action.type) {
      case 'SET_SCOPE_OF_SCHOOL':
         return action.payload;
      default:
         return state;
   }
};

const scopeDatasetReducer = (state = ['scope_of_dataset'], action) => {
   switch (action.type) {
      case 'SET_SCOPE_OF_DATASET':
         return action.payload;
      default:
         return state;
   }
};

const scopeDatasetYearReducer = (state = ['scope_of_dataset_year'], action) => {
   switch (action.type) {
      case 'SET_SCOPE_OF_DATASET_YEAR':
         return action.payload;
      default:
         return state;
   }
};

const rootReducer = combineReducers({
   scopeStateReducer,
   scopeDistrictReducer,
   scopeSchoolReducer,
   scopeDatasetReducer,
   scopeDatasetYearReducer,
});

export default rootReducer;
