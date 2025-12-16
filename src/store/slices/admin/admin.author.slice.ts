import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api/axios'
import { IUser } from '../../types.ts/types'

interface AdminAuthorState {
  authors: IUser[]
  selectedAuthor: IUser | null
  loading: boolean
  error: string | null
}

const initialState: AdminAuthorState = {
  authors: [],
  selectedAuthor: null,
  loading: false,
  error: null
}

export const getAllAuthors = createAsyncThunk(
  'adminAuthor/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/dashboard/author')
      return response.data.authors
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch authors')
    }
  }
)

export const getAuthorById = createAsyncThunk(
  'adminAuthor/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/dashboard/author/${id}`)
      return response.data.author
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch author')
    }
  }
)

export const createAuthor = createAsyncThunk(
  'adminAuthor/create',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/admin/dashboard/author', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create author')
    }
  }
)

export const updateAuthor = createAsyncThunk(
  'adminAuthor/update',
  async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/dashboard/author/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update author')
    }
  }
)

export const deleteAuthor = createAsyncThunk(
  'adminAuthor/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/dashboard/author/${id}`)
      return id
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete author')
    }
  }
)

const adminAuthorSlice = createSlice({
  name: 'adminAuthor',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearSelectedAuthor: (state) => {
      state.selectedAuthor = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAuthors.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllAuthors.fulfilled, (state, action) => {
        state.loading = false
        state.authors = action.payload
      })
      .addCase(getAllAuthors.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(getAuthorById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAuthorById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedAuthor = action.payload
      })
      .addCase(getAuthorById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(createAuthor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createAuthor.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createAuthor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateAuthor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateAuthor.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateAuthor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deleteAuthor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteAuthor.fulfilled, (state, action) => {
        state.loading = false
        state.authors = state.authors.filter(author => author.id !== action.payload)
      })
      .addCase(deleteAuthor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { clearError, clearSelectedAuthor } = adminAuthorSlice.actions
export default adminAuthorSlice.reducer