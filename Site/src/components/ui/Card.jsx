import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../theme/tokens';

const cardVariants = cva(
  'relative overflow-hidden rounded-2xl border transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white shadow-sm border-secondary-100 hover:shadow-md',
        elevated: 'bg-white shadow-lg border-secondary-100 hover:shadow-xl',
        interactive: 'bg-white shadow-sm border-secondary-100 hover:shadow-lg hover:border-secondary-200 cursor-pointer',
        spotlight: 'bg-gradient-to-br from-white to-secondary-50 shadow-lg border-secondary-200 hover:shadow-xl',
        glass: 'bg-white/80 backdrop-blur-sm shadow-lg border-white/20 hover:bg-white/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const Card = React.forwardRef(({ 
  children, 
  className, 
  variant,
  hover = false,
  onClick,
  ...props 
}, ref) => {
  const isInteractive = hover || onClick || variant === 'interactive';
  
  return (
    <motion.div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      onClick={onClick}
      whileHover={isInteractive ? { 
        y: -2, 
        scale: 1.01,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      {/* Spotlight effect for spotlight variant */}
      {variant === 'spotlight' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Subtle border glow on hover */}
      {isInteractive && (
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary-500/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {children}
    </motion.div>
  );
});

Card.displayName = "Card";

export const CardHeader = ({ children, className = '' }) => (
  <div className={cn('p-6 pb-4', className)}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={cn('px-6 pb-6', className)}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={cn('px-6 py-4 border-t border-secondary-100', className)}>
    {children}
  </div>
);
