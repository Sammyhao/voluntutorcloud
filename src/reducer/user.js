import { createSlice } from '@reduxjs/toolkit'

const Initialstate = {
  language: 1,
  role: true,
  login: false,
  name: '',
  username: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: Initialstate },
  reducers: {
    getloggedin: (state) => {
      return state
    },
    login: (state = Initialstate, action) => {
      state.value = action.payload
      console.log('into userslice and completed')
    },
    getloggedout: (state) => {
      return state
    },
    logout: (state) => {
      state.value = Initialstate
    },
  },
})

export const { login, logout, getloggedin } = userSlice.actions

export default userSlice.reducer
