import { call, put, takeLatest, all } from 'redux-saga/effects'
import { changelanguage, login, logout } from '../reducer/user'
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
  let googlemeetlink = data.data.user[0].googlemeetlink
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
    googlemeetlink: googlemeetlink,
  }
  return action
}
function* fetchData() {
  const data = yield call(getProcesses)
  const action = yield call(transform, data)
  yield put(login(action))
}

function* logout_saga() {
  yield put(logout())
}
function* change_lang() {
  yield put(changelanguage())
}
function* mySaga() {
  yield all([
    takeLatest('user/getloggedin', fetchData),
    takeLatest('user/getloggedout', logout_saga),
    takeLatest('user/changelang', change_lang),
  ])
}

export default mySaga
