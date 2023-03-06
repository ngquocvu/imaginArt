import { createAction } from '@reduxjs/toolkit';

export const createModuleActions = <T, Q, K>(
  moduleName: string,
  actionName: string
) => {
  return {
    REQUEST: createAction<T>(`${moduleName}:${actionName}:PENDING`),
    SUCCESS: createAction<Q>(`${moduleName}:${actionName}:FULFILLED`),
    FAILURE: createAction<K>(`${moduleName}:${actionName}:REJECTED`),
  };
};

export const createSagaHandler = (fn: () => void) => fn;
