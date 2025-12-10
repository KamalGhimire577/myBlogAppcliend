import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api/axios'
import { IUser, IAdminAuthResponse } from '../../types.ts/types'

interface AuthState {
  user: IUser | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('authToken'),
  loading: false,
  error: null
}

export const registerAuthor = createAsyncThunk(
  'auth/register',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      console.log('Sending registration request...');
      
      const response = await api.post<IAdminAuthResponse>('/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log('Registration successful:', response.data);
      return response.data
    } catch (error: any) {
      console.error('Registration failed:', error.response?.status, error.response?.data);
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const loginAuthor = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<IAdminAuthResponse>('/auth/signin', credentials)
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
      }
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAuthor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerAuthor.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user || null
        state.token = action.payload.token || null
      })
      .addCase(registerAuthor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(loginAuthor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAuthor.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user || null
        state.token = action.payload.token || null
      })
      .addCase(loginAuthor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer