import React from 'react';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Input = ({ onSubmit }: Props) => {
  return (
    <form
      className="w-full relative"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
    >
      <input
        type="search"
        id="search"
        className="block w-full p-4 pr-28 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 focus:outline-none border-b-4"
        placeholder="An oil pastel drawing of an annoyed cat in a spaceship"
        required
      />
      <button
        type="submit"
        className="text-gray-500 border-l-2 font-bold border-gray-300 absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 px-3 py-2"
      >
        Generate
      </button>
    </form>
  );
};

export default Input;
