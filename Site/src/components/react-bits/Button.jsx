import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../theme/tokens';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 border border-primary-600',
        secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 border border-secondary-200',
        ghost: 'hover:bg-secondary-100 text-secondary-700 border border-transparent',
        outline: 'border border-secondary-200 bg-white hover:bg-secondary-50 text-secondary-900',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-12 px-4 py-3 text-base',
        lg: 'h-14 px-6 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const Button = React.forwardRef(({ 
  className, 
  variant, 
  size, 
  children,
  disabled,
  loading,
  onClick,
  ...props 
}, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
