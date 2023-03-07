import { GeneratedPhotoTypes } from '@/custom-types/common';
import { createModuleActions } from '@/utils/reduxTools';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchAllGeneratedPhoto } from '@/services/generatedPhoto';
import { fetchGeneratedProtoTypes } from '@/custom-types';
const initialState: GeneratedPhotoTypes = {
  pending: false,
  data: {
    img: null,
    prompt: null,
  },
  error: null,
};

const generatedPhotoFetchActions = createModuleActions<
  string,
  GeneratedPhotoTypes,
  GeneratedPhotoTypes
>('generatedPhoto', 'fetch');

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

const fetchGeneratedPhotoSagaHandler = function* (
  action: PayloadAction<string>
) {
  try {
    const data: fetchGeneratedProtoTypes = yield call(() =>
      fetchAllGeneratedPhoto(action.payload)
    );
    yield put(
      generatedPhotoFetchActions.SUCCESS({
        pending: false,
        data: {
          img: data.img,
          prompt: data.prompt,
        },
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
  const fetchGeneratedPhoto = (prompt: string) =>
    dispatch(generatedPhotoFetchActions.REQUEST(prompt));
  return {
    fetchGeneratedPhoto,
  };
};
