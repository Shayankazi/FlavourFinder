import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../theme/tokens';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl',
        secondary: 'bg-secondary-100 hover:bg-secondary-200 text-secondary-800 border border-secondary-200 hover:border-secondary-300',
        ghost: 'hover:bg-secondary-100 text-secondary-700 hover:text-secondary-900',
        outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:shadow-lg',
        destructive: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export const Button = React.forwardRef(({ 
  children, 
  variant,
  size,
  className,
  disabled = false,
  loading = false,
  onClick,
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -1 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* Shimmer effect for primary variant */}
      {variant === 'primary' && !disabled && !loading && (
        <motion.div
          className="absolute inset-0 -top-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
      
      {loading ? (
        <div className="flex items-center space-x-2">
          <motion.div 
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
});

Button.displayName = "Button";
