export type PostTypes = {
  prompt: string;
  photo: string;
  artist: string;
  _id: string;
};

export type ReduxPostsTypes = {
  pending: boolean;
  data: PostTypes[];
  error: string | null;
};

export type ReduxUploadPostTypes = {
  pending: boolean;
  data: string | null;
  error: string | null;
};
export type PostTypesOmitID = Omit<PostTypes, '_id'>;
