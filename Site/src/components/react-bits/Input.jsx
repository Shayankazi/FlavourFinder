import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../theme/tokens';

const inputVariants = cva(
  'flex h-12 w-full rounded-lg border bg-gray-700 px-4 py-3 text-base text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-gray-600',
        filled: 'border-transparent bg-gray-600',
        ghost: 'border-transparent bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Input = React.forwardRef(({ 
  className, 
  type = 'text',
  variant,
  icon: Icon,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
          <Icon size={18} className={cn(
            'transition-colors duration-200',
            isFocused ? 'text-orange-500' : 'text-gray-400'
          )} />
        </div>
      )}
      
      <input
        type={type}
        className={cn(
          inputVariants({ variant }),
          Icon && 'pl-12',
          className
        )}
        ref={ref}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
      
    </div>
  );
});

Input.displayName = "Input";

export { Input, inputVariants };
