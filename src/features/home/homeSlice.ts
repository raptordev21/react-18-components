import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

type HomeState = {
  isSideNavOpen: boolean
}

const initialState: HomeState = {
  isSideNavOpen: true,
}

type SideNavPayload = {
  status: boolean
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateSideNav: (state, action: PayloadAction<SideNavPayload>) => {
      state.isSideNavOpen = action.payload.status
    },
  }
})

export const selectSideNav = (state: RootState) => state.home.isSideNavOpen

export const {
  updateSideNav,
} = homeSlice.actions

export default homeSlice.reducer