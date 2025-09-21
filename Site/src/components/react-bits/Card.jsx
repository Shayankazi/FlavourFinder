import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../../theme/tokens';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-white border-secondary-200 hover:shadow-md',
        elevated: 'bg-white border-secondary-200 shadow-lg hover:shadow-xl',
        interactive: 'bg-white border-secondary-200 hover:shadow-lg hover:border-secondary-300 cursor-pointer',
        spotlight: 'bg-gradient-to-br from-white to-secondary-50 border-secondary-200 shadow-lg hover:shadow-xl',
        glass: 'bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:bg-white/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const Card = React.forwardRef(({ 
  className, 
  variant,
  children,
  onClick,
  ...props 
}, ref) => {
  const isInteractive = onClick || variant === 'interactive';

  return (
    <motion.div
      ref={ref}
      className={cn(cardVariants({ variant }), 'relative overflow-hidden', className)}
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
      {/* Spotlight effect */}
      {variant === 'spotlight' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Interactive border glow */}
      {isInteractive && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-primary-500/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 -top-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      
      {children}
    </motion.div>
  );
});

Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  cardVariants 
};
