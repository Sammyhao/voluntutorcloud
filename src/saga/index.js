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
  let role = data.data.user[0].role
  let name = data.data.user[0].fullname
  let username = data.data.user[0].username
  if (language == 'chinese') {
    language = 1
  } else {
    language = 0
  }
  if (role == 'teacher') {
    role = true
  } else {
    role = false
  }
  const action = {
    language: language,
    role: role,
    login: true,
    name: name,
    username: username,
  }
  return action
}
function* fetchData() {
  const data = yield call(getProcesses)
  const action = yield call(transform, data)
  yield put(login(action))
}

function* mySaga() {
  yield takeLatest('user/getloggedin', fetchData)
}

export default mySaga
