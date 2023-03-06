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
  const pendingStyles = pending ? 'bg-gray-200 animate-pulse' : 'bg-gray-50';
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
        className={`block w-full p-4 pr-28 text-gray-900 border font-semibold border-gray-300 rounded-lg focus:ring-blue-300 focus:border-blue-400 focus:outline-none dark:bg-gray-800 dark:text-gray-100 dark:border-gray-300 ${
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
        className={`px-3 py-2 text-gray-500 border-l-2 font-bold border-gray-500 absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:text-gray-300 ${
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
