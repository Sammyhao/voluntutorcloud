import { call, put, takeEvery } from 'redux-saga/effects'
import { login } from '../reducer/user'
const LOGIN = 'user/login'
const LOGOUT = 'user/logout'

function* fetchData() {
  const data = yield call(() =>
    fetch('https://voluntutorcloud-server.herokuapp.com/login'),
  )
  const action = yield (data.data.user[0].lang, data.data.user[0].role, true)
  yield put(login(action))
}

function* mySaga() {
  yield takeEvery(LOGIN, fetchData)
}

export default mySaga
