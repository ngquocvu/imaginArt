import Link from 'next/link';
import React from 'react';

type Props = {
  onClick?: () => void;
};

const Button = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-8 border-b-4 border-blue-700 hover:border-blue-500 rounded-full"
    >
      Community Gallery
    </button>
  );
};

export default Button;
