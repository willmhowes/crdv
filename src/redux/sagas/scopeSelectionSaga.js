import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchStateList() {
  try {
    const response = yield axios.get('/api/data/state');
    yield put({ type: 'SET_STATE_LIST', payload: response.data });
  } catch (error) {
    console.log('list of states GET request failed', error);
  }
}

function* fetchDistrictList(action) {
  try {
    let state = action.payload;
    const response = yield axios.get(`/api/data/district/${state}`);
    yield put({ type: 'SET_DISTRICT_LIST', payload: response.data });
  } catch (error) {
    console.log('list of districts GET request failed', error);
  }
}

function* fetchSchoolList(action) {
  try {
    let district = action.payload;
    const response = yield axios.get(`/api/data/school/${district}`);
    yield put({ type: 'SET_SCHOOL_LIST', payload: response.data });
  } catch (error) {
    console.log('list of schools GET request failed', error);
  }
}

function* fetchDatasetList(action) {
  try {
    let { currentScope, scopeInfo } = action.payload;
    let { stateValue, districtValue, schoolValue } = scopeInfo;
    let response;
    if (currentScope === 'state') {
      response = yield axios.get(`/api/data/dataset/${currentScope}/${stateValue}`);
    } else if (currentScope === 'district') {
      response = yield axios.get(`/api/data/dataset/${currentScope}/${districtValue}`);
    } else if (currentScope === 'school') {
      response = yield axios.get(`/api/data/dataset/${currentScope}/${schoolValue}`);
    }
    yield put({ type: 'SET_DATASET_LIST', payload: response.data });
  } catch (error) {
    console.log('list of datasets GET request failed', error);
  }
}

function* scopeSelectionSaga() {
  yield takeLatest('GET_STATE_LIST', fetchStateList);
  yield takeLatest('GET_DISTRICT_LIST', fetchDistrictList);
  yield takeLatest('GET_SCHOOL_LIST', fetchSchoolList);
  yield takeLatest('GET_DATASET_LIST', fetchDatasetList);
}

export default scopeSelectionSaga;
