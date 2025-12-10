import { configureStore } from '@reduxjs/toolkit'
import statusReducer from './slices/statusSlice'
import adminAuthReducer from './slices/admin/admin.auth.Slice'

export const store = configureStore({
  reducer: {
    status: statusReducer,
    adminAuth: adminAuthReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch