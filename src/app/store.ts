import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '@/features/home/homeSlice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;