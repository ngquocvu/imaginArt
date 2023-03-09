import {
  AxiosReturnedType,
  PostTypes,
  PostTypesOmitID,
  ReduxUploadPostTypes,
} from '@/custom-types';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { uploadPost } from '@/services/post';
import { createModuleActions } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

const initialState: ReduxUploadPostTypes = {
  pending: false,
  error: null,
  data: null,
};

const uploadPostAction = createModuleActions<
  PostTypesOmitID,
  PostTypes,
  undefined
>('post', 'uploadPost');

export const uploadPostSlice = createSlice({
  name: 'uploadPost',
  initialState,
  reducers: {
    resetUploadPost() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(uploadPostAction.REQUEST, (state) => {
      return { ...state, data: null, pending: true };
    });
    builder.addCase(uploadPostAction.SUCCESS, (state, action) => {
      return { ...state, pending: false, data: action.payload._id };
    });
    builder.addCase(uploadPostAction.FAILURE, (state) => {
      return {
        ...state,
        pending: false,
        error: 'There are errors happened while fetching posts',
      };
    });
  },
});

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
};

export const useStates = () => {
  const recentlyUploadedPost = useAppSelector((state) => state.uploadPost);
  return { recentlyUploadedPost };
};

const { resetUploadPost: resetUploadPostAction } = uploadPostSlice.actions;

export const useActions = () => {
  const dispatch = useAppDispatch();
  const uploadPost = (post: PostTypesOmitID) =>
    dispatch(uploadPostAction.REQUEST(post));
  const resetUploadPost = () => dispatch(resetUploadPostAction());
  return { uploadPost, resetUploadPost };
};
