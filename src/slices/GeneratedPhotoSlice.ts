import { ReduxGeneratedPhotoTypes } from '@/custom-types/common';
import { createModuleActions } from '@/utils/reduxTools';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getGeneratedPhoto } from '@/services/generatedPhoto';
import { GeneratedProtoTypes } from '@/custom-types';
const initialState: ReduxGeneratedPhotoTypes = {
  pending: false,
  data: null,
  error: null,
};

const generatedPhotoFetchActions = createModuleActions<
  string,
  GeneratedProtoTypes,
  undefined
>('generatedPhoto', 'fetch');

export const generatedPhotoSlice = createSlice({
  name: 'generatedPhoto',
  initialState: initialState,
  reducers: {
    resetGeneratedPhotoState() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(generatedPhotoFetchActions.REQUEST, (state) => ({
      ...state,
      pending: true,
    }));
    builder.addCase(generatedPhotoFetchActions.SUCCESS, (state, action) => {
      return {
        ...state,
        pending: false,
        data: {
          img: action.payload.img,
          prompt: action.payload.prompt,
        },
      };
    });
    builder.addCase(generatedPhotoFetchActions.FAILURE, (state) => ({
      ...state,
      pending: false,
      error: 'There are errors happened while generating data',
    }));
  },
});

const fetchGeneratedPhotoSagaHandler = function* (
  action: PayloadAction<string>
) {
  try {
    const data: GeneratedProtoTypes = yield call(() =>
      getGeneratedPhoto(action.payload)
    );
    yield put(generatedPhotoFetchActions.SUCCESS(data));
  } catch (e) {
    yield put(generatedPhotoFetchActions.FAILURE());
  }
};

export const watcherSaga = function* () {
  yield takeLatest(
    generatedPhotoFetchActions.REQUEST,
    fetchGeneratedPhotoSagaHandler
  );
};

const { resetGeneratedPhotoState: resetGeneratedPhotoAction } =
  generatedPhotoSlice.actions;
export const useStates = () => {
  const generatedPhoto = useAppSelector((state) => state.generatedPhoto);
  return { generatedPhoto };
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  const fetchGeneratedPhoto = (prompt: string) =>
    dispatch(generatedPhotoFetchActions.REQUEST(prompt));
  const resetGeneratedPhotoState = () => dispatch(resetGeneratedPhotoAction());
  return {
    fetchGeneratedPhoto,
    resetGeneratedPhotoState,
  };
};
