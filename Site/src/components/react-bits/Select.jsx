import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../../theme/tokens';

const selectVariants = cva(
  'flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'border-secondary-200 bg-white focus:ring-primary-500',
        filled: 'border-transparent bg-secondary-50 focus:bg-white focus:ring-primary-500',
        ghost: 'border-transparent bg-transparent focus:bg-white focus:border-secondary-200 focus:ring-primary-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Select = React.forwardRef(({ 
  className, 
  variant,
  children,
  placeholder = "Select an option",
  value,
  onChange,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <motion.select
        className={cn(selectVariants({ variant }), 'appearance-none', className)}
        ref={ref}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        whileFocus={{ 
          scale: 1.01,
          transition: { type: "spring", stiffness: 400, damping: 17 }
        }}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {children}
      </motion.select>
      
      {/* Custom dropdown arrow */}
      <motion.div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
        animate={{ 
          rotate: isFocused ? 180 : 0,
          color: isFocused ? '#6366f1' : '#9ca3af'
        }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown size={16} />
      </motion.div>
      
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-md border-2 border-primary-400 pointer-events-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isFocused ? 0.4 : 0,
          scale: isFocused ? 1 : 0.95
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
});

Select.displayName = "Select";

export { Select, selectVariants };
