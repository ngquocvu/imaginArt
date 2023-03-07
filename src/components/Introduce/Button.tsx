import Link from 'next/link';
import React from 'react';

type Props = {
  onClick?: () => void;
};

const Button = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className=" text-white font-bold py-3 px-12 rounded-full bg-gray-600 bg-opacity-50"
    >
      Community Gallery
    </button>
  );
};

export default Button;
