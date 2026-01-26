import { createSlice } from "@reduxjs/toolkit";
const initialState={
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.user = action.payload;
    },
    clearUserDetail: (state) => {
      state.user = null;
    },
  },
});

export const { setUserDetail, clearUserDetail } = userSlice.actions;

export default userSlice.reducer;
