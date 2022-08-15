import { createSlice } from '@reduxjs/toolkit'

const Initialstate = {
  language: 1,
  role: true,
  login: false,
  name: '',
  username: '',
  googlemeetlink: '',
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
    },
    getloggedout: (state) => {
      return state
    },
    logout: (state) => {
      state.value = Initialstate
    },
    changelanguage: (state) => {
      if (state.value['language'] == 0) state.value['language'] = 1
      else state.value['language'] = 0
    },
    changelang: (state) => {
      return state
    },
  },
})

export const {
  login,
  logout,
  getloggedin,
  getloggedout,
  changelanguage,
  changelang,
} = userSlice.actions

export default userSlice.reducer
