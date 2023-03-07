import React from 'react';
import Input from '../Introduce/Input';

type PostFormType = {
  value: string;
  onValueChange?: (value: string) => void;
};
const PostForm = ({ value = '', onValueChange }: PostFormType) => {
  return (
    <Input
      value={value}
      rightButtonValue="Publish"
      placeholder="Your name"
      className="rounded-lg"
      onInputValue={onValueChange}
    />
  );
};

export default PostForm;
