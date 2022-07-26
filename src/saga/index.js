import { call, put, takeEvery } from 'redux-saga/effects'
import { login } from '../reducer/user'
import axios from 'axios'

const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
const FETCH_DATA = 'FETCH_DATA'

async function getProcesses() {
  let temp = axios.get(`https://voluntutorcloud-server.herokuapp.com/login`)
  console.log(temp)
  return temp
}

function* fetchData() {
  console.log('into function')
  const data = yield call(getProcesses)
  console.log('data', data)
  let language = data.data.user[0].lang
  if (language == 'chinese') {
    language = 1
  } else {
    language = 0
  }
  let role = data.data.user[0].role
  if (role == 'teacher') {
    role = true
  } else {
    role = false
  }
  const action = {
    language: language,
    role: role,
    login: true,
  }
  console.log('action', action)
  yield put({ type: FETCH_DATA_SUCCESS, payload: action })
}

function* mySaga() {
  console.log('into saga function')
  yield takeEvery(FETCH_DATA, fetchData)
}

export default mySaga
