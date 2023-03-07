import React from 'react';

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
  pending?: boolean;
  value?: string;
  onInputValue: (value: string) => void;
};

const Input = ({
  onSubmit,
  disabled = false,
  pending = false,
  value = '',
  onInputValue,
}: Props) => {
  const disabledStyles = 'cursor-not-allowed';
  const pendingStyles = pending ? 'animate-pulse' : '';
  return (
    <form
      className={`w-full relative`}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
    >
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onInputValue(e.target.value)
        }
        id="search"
        className={`bg-opacity-20 bg-gray-600 backdrop-blur-lg drop-shadow-lg block w-full p-5 pr-28 text-gray-100 border font-semibold rounded-full focus:ring-blue-300 focus:border-blue-400 focus:outline-none border-none ${
          disabled && disabledStyles
        } ${pendingStyles}`}
        placeholder={
          'An oil pastel drawing of an annoyed cat in a spaceship...'
        }
        required
        disabled={disabled}
      />
      <button
        type="submit"
        className={`px-3 py-2 text-gray-300 font-bold border-gray-500 absolute right-3 top-3 focus:ring-4 focus:outline-none bg-gray-700 bg-opacity-70 rounded-full ${
          disabled && disabledStyles
        }`}
        disabled={disabled}
      >
        {pending ? 'Drawing...' : 'Draw'}
      </button>
    </form>
  );
};

export default Input;
