import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface LoadingIndicatorState {
	open: boolean;
	limit: number;
}

const defaultLimit = 15;

// Define the initial state using that type
const initialState: LoadingIndicatorState = {
	open: false,
	limit: defaultLimit,
};

// Actual Slice
export const pageLimitSlice = createSlice({
	name: 'pageLimit',
	initialState,
	reducers: {
		openModal(state) {
			state.open = true;
		},
		closeModal(state) {
			state.open = false;
		},
		setLimit(state, action) {
			state.limit = action.payload.limit || defaultLimit;
		},
	},
});

export const { closeModal, openModal ,setLimit} =
	pageLimitSlice.actions;

export default pageLimitSlice.reducer;
