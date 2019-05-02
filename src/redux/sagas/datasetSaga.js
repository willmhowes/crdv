import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSpecificDataset(action) {
   try {
      let { currentScope, scopeInfo } = action.payload;
      let { scopeIdentity, datasetValue, datasetYearValue } = scopeInfo;

      let urlString = `/api/data/scope/${currentScope}/${scopeIdentity}/${datasetValue}/${datasetYearValue}`;
      let response = yield axios.get(urlString);

      yield put({ type: 'SET_SPECIFIC_DATASET', payload: response.data });
   } catch (error) {
      console.log('specific dataset GET request failed', error);
   }
}

function* scopeSelectionSaga() {
   yield takeLatest('GET_SPECIFIC_DATASET', fetchSpecificDataset);
}

export default scopeSelectionSaga;
