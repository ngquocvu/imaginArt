export type PostTypes = {
  prompt: string;
  photo: string;
  artist: string;
  _id: string;
};

export type ReduxPostTypes = {
  pending: boolean;
  data: PostTypes[];
  error: string | null;
};

export type PostTypesOmitID = Omit<PostTypes, '_id'>;
