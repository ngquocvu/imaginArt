import React from 'react';
import Spinner from '../Common/Spinner';

type Props = {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
  pending?: boolean;
  value?: string;
  rightButtonValue?: string;
  placeholder?: string;
  variant?: 'submit' | 'default';
  onInputValue?: (value: string) => void;
  className?: string;
};

const Input = ({
  onSubmit,
  rightButtonValue,
  disabled = false,
  pending = false,
  variant = 'default',
  value = '',
  placeholder = '',
  className = '',
  onInputValue,
}: Props) => {
  const disabledStyles = 'cursor-not-allowed';
  const pendingStyles = pending ? 'animate-pulse' : '';
  const getVariantStyles = () => {
    switch (variant) {
      case 'submit':
        return {
          buttonStyles:
            'focus:ring-4 focus:outline-none bg-green-700 bg-opacity-70 rounded',
        };
      default:
        return {
          buttonStyles:
            'focus:ring-4 focus:outline-none bg-gray-700 bg-opacity-70 rounded-full',
        };
    }
  };
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
        className={`bg-opacity-30 bg-gray-600 backdrop-blur-lg drop-shadow-lg block w-full p-5 pr-28 text-gray-100 border font-semibold rounded-full focus:ring-blue-300 focus:border-blue-400 focus:outline-none border-none text-sm md:text-base ${
          disabled && disabledStyles
        } ${pendingStyles} ${className}`}
        placeholder={placeholder}
        required
        disabled={disabled}
      />
      {pending ? (
        <div className="absolute right-4 top-4">
          <Spinner />
        </div>
      ) : (
        rightButtonValue && (
          <button
            type="submit"
            className={`px-3 py-2 text-gray-300 text-sm md:text-base font-bold border-gray-500 absolute right-3 top-3 ${
              getVariantStyles().buttonStyles
            } ${disabled && disabledStyles}`}
            disabled={disabled}
          >
            {rightButtonValue}
          </button>
        )
      )}
    </form>
  );
};

export default Input;
