import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api/axios'
import { IUser, IAdminAuthResponse } from '../../types.ts/types'

interface AdminAuthState {
  user: IUser | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AdminAuthState = {
  user: null,
  token: localStorage.getItem('adminToken'),
  loading: false,
  error: null
}

export const registerAdmin = createAsyncThunk(
  'adminAuth/register',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post<IAdminAuthResponse>('/admin/auth/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const loginAdmin = createAsyncThunk(
  'adminAuth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<IAdminAuthResponse>('/admin/auth/signin', credentials)
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token)
      }
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('adminToken')
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user || null
        state.token = action.payload.token || null
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user || null
        state.token = action.payload.token || null
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { logout, clearError } = adminAuthSlice.actions
export default adminAuthSlice.reducer