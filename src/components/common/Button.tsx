import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'eco' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = true,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'min-h-touch px-4 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition touch-active shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const variants = {
    primary: 'bg-municipal-blue hover:bg-municipal-darkBlue text-white shadow-blue-500/20',
    eco: 'bg-eco-green hover:bg-eco-darkGreen text-white shadow-emerald-500/20',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800',
    outline: 'border-2 border-municipal-blue text-municipal-blue hover:bg-municipal-lightBlue',
    danger: 'bg-action-red hover:bg-red-700 text-white shadow-red-500/20',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
