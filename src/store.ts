import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import * as generatedPhoto from './slices/GeneratedPhotoSlice';
import * as posts from './slices/PostSlice';
import * as uploadPost from './slices/uploadPostSlice';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  generatedPhoto: generatedPhoto.generatedPhotoSlice.reducer,
  posts: posts.PostSlice.reducer,
  uploadPost: uploadPost.uploadPostSlice.reducer,
});

export const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

const watcherSagaList = [
  generatedPhoto.watcherSaga,
  posts.watcherSaga,
  uploadPost.watcherSaga,
];
watcherSagaList.forEach((watcherSaga) => sagaMiddleware.run(watcherSaga));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
