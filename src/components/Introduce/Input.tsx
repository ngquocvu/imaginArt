import React from 'react';

type Props = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
  pending?: boolean;
  value?: string;
  rightButtonValue: string;
  placeholder?: string;
  onInputValue?: (value: string) => void;
  className?: string;
};

const Input = ({
  onSubmit,
  rightButtonValue,
  disabled = false,
  pending = false,
  value = '',
  placeholder = '',
  className = '',
  onInputValue,
}: Props) => {
  const disabledStyles = 'cursor-not-allowed';
  const pendingStyles = pending ? 'animate-pulse' : '';
  return (
    <form
      className={`w-full relative`}
      onSubmit={
        onSubmit
          ? (e: React.FormEvent<HTMLFormElement>) => onSubmit(e)
          : undefined
      }
    >
      <input
        type="text"
        value={value}
        onChange={
          onInputValue
            ? (e: React.ChangeEvent<HTMLInputElement>) =>
                onInputValue(e.target.value)
            : undefined
        }
        id="search"
        className={`bg-opacity-20 bg-gray-600 backdrop-blur-lg drop-shadow-lg block w-full p-5 pr-28 text-gray-100 border font-semibold rounded-full focus:ring-blue-300 focus:border-blue-400 focus:outline-none border-none ${
          disabled && disabledStyles
        } ${pendingStyles} ${className}`}
        placeholder={placeholder}
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
        {rightButtonValue}
      </button>
    </form>
  );
};

export default Input;
