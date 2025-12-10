import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStatusState } from '../types.ts/types'


const initialState:  IStatusState = {
  loading: false,
  error: null,
  success: null
}

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.success = action.payload
      state.loading = false
    },
    clearMessages: (state) => {
      state.error = null
      state.success = null
    }
  }
})

export const { setLoading, setError, setSuccess, clearMessages } = statusSlice.actions
export default statusSlice.reducer