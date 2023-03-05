import { GeneratedPhotoTypes } from '@/custom-types/common';
import { createModuleActions } from '@/utils/reduxTools';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { createSlice } from '@reduxjs/toolkit';
import { createActions } from 'redux-actions';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchAllGeneratedPhoto } from '@/services/generatedPhoto';
const initialState: GeneratedPhotoTypes = {
  pending: false,
  data: null,
  error: null,
};

const generatedPhotoFetchActions = createModuleActions<GeneratedPhotoTypes>(
  'generatedPhoto',
  'fetch'
);

export const generatedPhotoSlice = createSlice({
  name: 'generatedPhoto',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(generatedPhotoFetchActions.REQUEST, (state) => ({
      ...state,
      pending: true,
    }));
    builder.addCase(generatedPhotoFetchActions.SUCCESS, (state, action) => {
      return { ...state, data: action.payload.data, pending: false };
    });
    builder.addCase(generatedPhotoFetchActions.FAILURE, (state, action) => ({
      ...state,
      pending: false,
      error: action.payload.error,
    }));
  },
});

const fetchGeneratedPhotoSagaHandler = function* () {
  try {
    const data: string = yield call(() => fetchAllGeneratedPhoto());
    yield delay(1000);
    yield put(
      generatedPhotoFetchActions.SUCCESS({
        data: data,
        pending: false,
        error: null,
      })
    );
  } catch (e) {
    yield put(
      generatedPhotoFetchActions.FAILURE({
        data: null,
        pending: false,
        error: "Can't fetch data due to errors",
      })
    );
  }
};

export const watcherSaga = function* () {
  yield takeLatest(
    generatedPhotoFetchActions.REQUEST,
    fetchGeneratedPhotoSagaHandler
  );
};

export const useStates = () => {
  const generatedPhoto = useAppSelector((state) => state.generatedPhoto);
  return { generatedPhoto };
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  const fetchGeneratedPhoto = () =>
    dispatch(generatedPhotoFetchActions.REQUEST());
  return {
    fetchGeneratedPhoto,
  };
};
