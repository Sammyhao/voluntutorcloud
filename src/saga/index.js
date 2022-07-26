import { call, put, takeEvery } from 'redux-saga/effects'
import Axios from 'axios'
import { login } from '../reducer/user'

const LOGIN = 'user/login'
const LOGOUT = 'user/logout'

function* fetchData() {
  const data = yield call(() => {
    Axios.get('https://voluntutorcloud-server.herokuapp.com/login').then(
      (response) => {
        response.data
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
