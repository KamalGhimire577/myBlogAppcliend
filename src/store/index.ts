import { configureStore } from '@reduxjs/toolkit'
import statusReducer from './slices/statusSlice'
import adminAuthReducer from './slices/admin/admin.auth.Slice'
import authReducer from './slices/auth/auth.slice'

export const store = configureStore({
  reducer: {
    status: statusReducer,
    adminAuth: adminAuthReducer,
    auth: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch