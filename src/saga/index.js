import { call, put, takeLatest } from 'redux-saga/effects'
import { login } from '../reducer/user'
import axios from 'axios'

async function getProcesses() {
  console.log('into api')
  return axios.get(`https://voluntutorcloud-server.herokuapp.com/login`)
}

function* transform(data) {
  console.log('transforming')
  console.log('data:', data)
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
  return action
}
function* fetchData() {
  const data = yield call(getProcesses)
  const action = yield call(transform, data)
  //   yield put({ type: FETCH_DATA_SUCCESS, payload: action })
  yield put(login(action))
  console.log('action: ', action)
  console.log('complete')
}

function* mySaga() {
  console.log('into saga function')
  yield takeLatest('user/getloggedin', fetchData)
}

export default mySaga
