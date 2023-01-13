import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface LoadingIndicatorState {
	open: boolean;
	text: string;
}

const defaultText = 'Please wait...';

// Define the initial state using that type
const initialState: LoadingIndicatorState = {
	open: false,
	text: defaultText,
};

// Actual Slice
export const loadingIndicatorSlice = createSlice({
	name: 'loadingIndicator',
	initialState,
	reducers: {
		openLoadingIndicator(state, action) {
			state.open = true;
			state.text = action.payload.text || defaultText;
		},
		closeLoadingIndicator(state) {
			state.open = false;
		},
	},
});

export const { closeLoadingIndicator, openLoadingIndicator } =
	loadingIndicatorSlice.actions;

export default loadingIndicatorSlice.reducer;
