import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AxiosReturnedType,
  PostTypes,
  PostTypesOmitID,
  ReduxPostsTypes,
} from '@/custom-types';
import { createModuleActions } from '@/utils';
import { call, takeLatest } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import { fetchPosts } from '@/services/post';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

const initialState: ReduxPostsTypes = {
  pending: false,
  error: null,
  data: [],
};

const fetchAllPostsAction = createModuleActions<
  undefined,
  PostTypes[],
  undefined
>('post', 'fetchAll');

export const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllPostsAction.REQUEST, (state) => {
      state.pending = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(fetchAllPostsAction.SUCCESS, (state, action) => {
      state.data = action.payload;
      state.pending = false;
    });
    builder.addCase(fetchAllPostsAction.FAILURE, (state) => {
      state.error = 'There are errors happened while fetching posts';
      state.pending = false;
    });
  },
});

const fetchAllPostsHandler = function* () {
  try {
    const data: AxiosReturnedType<PostTypes[]> = yield call(() => fetchPosts());
    yield put(fetchAllPostsAction.SUCCESS(data.data));
  } catch (e) {
    yield put(fetchAllPostsAction.FAILURE());
  }
};

export const watcherSaga = function* () {
  yield takeLatest(fetchAllPostsAction.REQUEST, fetchAllPostsHandler);
};

export const useStates = () => {
  const posts = useAppSelector((state) => state.posts);
  return { posts };
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  const fetchAllPosts = () => dispatch(fetchAllPostsAction.REQUEST());

  return { fetchAllPosts };
};
