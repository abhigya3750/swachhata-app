import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'info', className = '' }) => {
  const variantStyles = {
    success: 'bg-eco-lightGreen text-eco-darkGreen border-eco-green/30',
    warning: 'bg-civic-lightYellow text-civic-darkYellow border-civic-yellow/30',
    error: 'bg-action-lightRed text-action-red border-action-red/30',
    info: 'bg-municipal-lightBlue text-municipal-darkBlue border-municipal-blue/30',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
