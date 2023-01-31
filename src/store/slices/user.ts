import { sendFeedback } from './../../functions/feedback';
import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../../types/types';

// Define a type for the slice state

// Define the initial state using that type
const initialState: { user: UserType | null } = {
  user: null,
};

// Actual Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    getUser(state) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '');
      state = storedUser || null;
    },

    signOut(state) {
      state.user = null;
      localStorage.removeItem('user');
      sendFeedback('Logout successful', 'success');
    },
  },
});

export const { updateUser, getUser, signOut } = userSlice.actions;

export default userSlice.reducer;
