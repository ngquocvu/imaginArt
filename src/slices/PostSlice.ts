import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AxiosReturnedType,
  PostTypes,
  PostTypesOmitID,
  ReduxPostTypes,
} from '@/custom-types';
import { createModuleActions } from '@/utils';
import { call, takeLatest } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import { fetchPosts, uploadPost } from '@/services/post';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

const initialState: ReduxPostTypes = {
  pending: false,
  error: null,
  data: [],
};

const fetchAllPostsAction = createModuleActions<
  undefined,
  PostTypes[],
  undefined
>('post', 'fetchAll');

const uploadPostAction = createModuleActions<
  PostTypesOmitID,
  PostTypes,
  undefined
>('post', 'uploadPost');

export const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllPostsAction.REQUEST, (state) => {
      state.pending = true;
    });
    builder.addCase(fetchAllPostsAction.SUCCESS, (state, action) => {
      state.data = action.payload;
      state.pending = false;
    });
    builder.addCase(fetchAllPostsAction.FAILURE, (state) => {
      state.error = 'There are errors happened while fetching posts';
      state.pending = false;
    });

    builder.addCase(uploadPostAction.REQUEST, (state) => {
      state.pending = true;
    });
    builder.addCase(uploadPostAction.SUCCESS, (state, action) => {
      state.data.push(action.payload);
      state.pending = false;
    });
    builder.addCase(uploadPostAction.FAILURE, (state) => {
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

const uploadPostHandler = function* ({
  payload,
}: {
  type: string;
  payload: PostTypesOmitID;
}) {
  try {
    const data: AxiosReturnedType<PostTypes> = yield call(() =>
      uploadPost(payload)
    );
    yield put(uploadPostAction.SUCCESS(data.data));
  } catch (e) {
    yield put(uploadPostAction.FAILURE());
  }
};

export const watcherSaga = function* () {
  yield takeLatest(uploadPostAction.REQUEST, uploadPostHandler);
  yield takeLatest(fetchAllPostsAction.REQUEST, fetchAllPostsHandler);
};

export const useStates = () => {
  const posts = useAppSelector((state) => state.posts);
  return { posts };
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  const fetchAllPosts = () => dispatch(fetchAllPostsAction.REQUEST);
  const updatePost = (post: PostTypesOmitID) =>
    dispatch(uploadPostAction.REQUEST(post));
  return { fetchAllPosts, updatePost };
};
