import { userSlice } from './slices/user';
import { configureStore } from '@reduxjs/toolkit';
import { loadingIndicatorSlice } from './slices/loadingIndicator';

export const store = configureStore({
	reducer: {
		[loadingIndicatorSlice.name]: loadingIndicatorSlice.reducer,
		[userSlice.name]: userSlice.reducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
