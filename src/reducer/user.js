import { createSlice } from '@reduxjs/toolkit'

const Initialstate = { language: 1, role: true, login: false }

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: Initialstate },
  reducers: {
    login: (state, action) => {
      state.value = action.payload
      console.log('into userslice and completed')
    },
    logout: (state) => {
      state.value = Initialstate
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
