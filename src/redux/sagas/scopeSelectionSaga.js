import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchStateList() {
  try {
    const response = yield axios.get('api/data/state');
    yield put({ type: 'SET_STATE_LIST', payload: response.data });
  } catch (error) {
    console.log('list of states GET request failed', error);
  }
}

function* scopeSelectionSaga() {
  yield takeLatest('GET_STATE_LIST', fetchStateList);
}

export default scopeSelectionSaga;
