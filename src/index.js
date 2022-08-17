import React from 'react'
import ReactDOM from 'react-dom'
import 'font-awesome/css/font-awesome.min.css'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './reducer/user'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga/index'
import { PersistGate } from 'redux-persist/es/integration/react'
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

const saga = createSagaMiddleware()
const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: [saga],
})

const Persistor = persistStore(store)

saga.run(mySaga)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={Persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)
