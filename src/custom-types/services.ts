export type AxiosReturnedType<T> = {
  data: T;
  success: boolean;
  error?: string;
};

export type GeneratedProtoTypes = {
  success: string;
  img: string;
  prompt: string;
  error?: string;
};
