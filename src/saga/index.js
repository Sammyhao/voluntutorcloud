import { call, put, takeEvery } from 'redux-saga/effects'
import { login } from '../reducer/user'
const LOGIN = 'user/login'
const LOGOUT = 'user/logout'
import Axios from 'axios'

function* fetchData() {
  const data = yield call(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        response.json()
      },
    )
  })
  console.log('data', data)
  const action = yield data.json()
  console.log('action json', action)
  yield put(login(action))
}

function* mySaga() {
  yield takeEvery(LOGIN, fetchData)
}

export default mySaga
