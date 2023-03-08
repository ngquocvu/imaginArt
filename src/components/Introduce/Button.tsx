import React from 'react';

type Props = {
  onClick?: () => void;
  value: string;
  variant?: 'default' | 'active' | 'error' | 'warning';
  disabled?: boolean;
};

const Button = ({
  onClick,
  value,
  variant = 'default',
  disabled = false,
}: Props) => {
  const disabledStyles = 'cursor-not-allowed';
  const getVariantStyles = () => {
    switch (variant) {
      case 'active':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      case 'warning':
        return ' bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-white font-bold py-3 px-12 text-xs md:text-base rounded-full bg-opacity-40 w-full ${getVariantStyles()} ${
        disabled && disabledStyles
      }`}
    >
      {value}
    </button>
  );
};

export default Button;
