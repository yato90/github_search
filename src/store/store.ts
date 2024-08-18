import { configureStore } from '@reduxjs/toolkit';
import repoReducer from './slice/repoSlice';

export const store = configureStore({
  reducer: {
    repos: repoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
