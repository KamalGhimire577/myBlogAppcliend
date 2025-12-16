import { configureStore } from '@reduxjs/toolkit'
import statusReducer from './slices/statusSlice'
import adminAuthReducer from './slices/admin/admin.auth.Slice'
import authReducer from './slices/auth/auth.slice'
import adminAuthorReducer from './slices/admin/admin.author.slice'

export const store = configureStore({
  reducer: {
    status: statusReducer,
    adminAuth: adminAuthReducer,
    auth: authReducer,
    adminAuthor: adminAuthorReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch