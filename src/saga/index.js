import { call, put, takeEvery } from 'redux-saga/effects'
import { login } from '../reducer/user'
import axios from 'axios'

const LOGIN = 'user/login'
const LOGOUT = 'user/logout'

async function getProcesses() {
  return axios.get(`https://voluntutorcloud-server.herokuapp.com/login`)
}

function* fetchData() {
  const data = yield call(getProcesses())
  console.log('data', data)
  const action = yield data.json()
  console.log('action json', action)
  yield put(login(action))
}

function* mySaga() {
  yield takeEvery(LOGIN, fetchData)
}

export default mySaga
