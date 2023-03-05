import { createAction } from '@reduxjs/toolkit';

export const createModuleActions = <T>(
  moduleName: string,
  actionName: string
) => {
  return {
    REQUEST: createAction<T | undefined>(`${moduleName}:${actionName}:PENDING`),
    SUCCESS: createAction<T>(`${moduleName}:${actionName}:FULFILLED`),
    FAILURE: createAction<T>(`${moduleName}:${actionName}:REJECTED`),
  };
};

export const createSagaHandler = (fn: () => void) => fn;
