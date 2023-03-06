import Link from 'next/link';
import React from 'react';

type Props = {
  onClick?: () => void;
};

const Button = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 dark:bg-blue-700 hover:bg-blue-400 dark:hover:bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-700 dark:border-blue-800 hover:border-blue-500 hover:dark:border-blue-900 rounded-full"
    >
      Community Gallery
    </button>
  );
};

export default Button;
