import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../theme/tokens';

const inputVariants = cva(
  'w-full px-4 py-3 rounded-xl transition-all duration-300 placeholder-secondary-400 focus:outline-none',
  {
    variants: {
      variant: {
        default: 'border border-secondary-200 bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-secondary-300',
        filled: 'bg-secondary-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 hover:bg-secondary-100',
        ghost: 'border border-transparent bg-transparent focus:bg-white focus:border-secondary-200 focus:ring-2 focus:ring-primary-500',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
      },
      state: {
        default: '',
        error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
        success: 'border-green-500 focus:ring-green-500 focus:border-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
    },
  }
);

export const Input = React.forwardRef(({ 
  className,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  icon: Icon,
  error = false,
  variant,
  size,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const state = error ? 'error' : 'default';

  return (
    <div className="relative">
      {Icon && (
        <motion.div 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 pointer-events-none"
          animate={{ 
            color: isFocused ? '#6366f1' : '#9ca3af',
            scale: isFocused ? 1.1 : 1 
          }}
          transition={{ duration: 0.2 }}
        >
          <Icon size={20} />
        </motion.div>
      )}
      <motion.input
        ref={ref}
        type={type}
        className={cn(
          inputVariants({ variant, size, state }),
          Icon && 'pl-10',
          className
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        whileFocus={{ 
          scale: 1.01,
          transition: { type: "spring", stiffness: 400, damping: 17 }
        }}
        {...props}
      />
      
      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-primary-500 pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isFocused ? 0.3 : 0,
          scale: isFocused ? 1 : 0.95
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
});

Input.displayName = "Input";

const selectVariants = cva(
  'w-full px-4 py-3 rounded-xl transition-all duration-300 bg-white focus:outline-none cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 hover:border-secondary-300',
        filled: 'bg-secondary-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-primary-500 hover:bg-secondary-100',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-5 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export const Select = React.forwardRef(({ 
  className,
  value,
  onChange,
  children,
  placeholder = 'Select an option',
  variant,
  size,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <motion.select
        ref={ref}
        className={cn(selectVariants({ variant, size }), className)}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        whileFocus={{ 
          scale: 1.01,
          transition: { type: "spring", stiffness: 400, damping: 17 }
        }}
        {...props}
      >
        <option value="">{placeholder}</option>
        {children}
      </motion.select>
      
      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-primary-500 pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isFocused ? 0.3 : 0,
          scale: isFocused ? 1 : 0.95
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
});

Select.displayName = "Select";
