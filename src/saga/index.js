import { call, put, takeEvery } from 'redux-saga/effects'
import { login } from '../reducer/user'
import axios from 'axios'

const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
const FETCH_DATA = 'FETCH_DATA'

async function getProcesses() {
  return axios.get(`https://voluntutorcloud-server.herokuapp.com/login`)
}

function* fetchData() {
  console.log('into function')
  const data = yield call(getProcesses())
  console.log('data', data)
  const action = yield data.json()
  console.log('action json', action)
  yield put({ type: FETCH_DATA_SUCCESS, payload: { action } })
}

function* mySaga() {
  console.log('into saga function')
  yield takeEvery(FETCH_DATA, fetchData)
}

export default mySaga
