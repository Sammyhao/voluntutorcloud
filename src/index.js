import React from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.min.css'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './reducer/user'
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga/index'

const saga = createSagaMiddleware()
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [saga],
})
saga.run(mySaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
