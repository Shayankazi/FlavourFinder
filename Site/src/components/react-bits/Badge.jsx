import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../theme/tokens';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary-100 text-primary-800 hover:bg-primary-200',
        secondary: 'border-transparent bg-secondary-100 text-secondary-800 hover:bg-secondary-200',
        destructive: 'border-transparent bg-red-100 text-red-800 hover:bg-red-200',
        success: 'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
        warning: 'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        accent: 'border-transparent bg-accent-100 text-accent-800 hover:bg-accent-200',
        outline: 'text-foreground border-current',
        error: 'border-transparent bg-red-100 text-red-800 hover:bg-red-200',
        primary: 'border-transparent bg-primary-600 text-white hover:bg-primary-700',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Badge = React.forwardRef(({ 
  className, 
  variant, 
  size,
  children,
  ...props 
}, ref) => {
  return (
    <motion.div
      className={cn(badgeVariants({ variant, size }), className)}
      ref={ref}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Pulse effect for primary variant */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary-400"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.div>
  );
});

Badge.displayName = "Badge";

export { Badge, badgeVariants };
