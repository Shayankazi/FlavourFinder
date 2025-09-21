import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../../theme/tokens';

const modalVariants = cva(
  'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-2xl duration-200 rounded-2xl',
  {
    variants: {
      size: {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  className,
  size,
  title,
  description,
  ...props 
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </Dialog.Overlay>
        
        <Dialog.Content asChild>
          <motion.div
            className={cn(modalVariants({ size }), className)}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              duration: 0.3 
            }}
            {...props}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            />
            
            <div className="relative">
              {title && (
                <Dialog.Title className="text-lg font-semibold leading-none tracking-tight mb-2">
                  {title}
                </Dialog.Title>
              )}
              
              {description && (
                <Dialog.Description className="text-sm text-secondary-600 mb-4">
                  {description}
                </Dialog.Description>
              )}
              
              {children}
            </div>
            
            <Dialog.Close asChild>
              <motion.button
                className="absolute right-4 top-4 rounded-full p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <X size={16} />
                <span className="sr-only">Close</span>
              </motion.button>
            </Dialog.Close>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const SlidePanel = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  side = 'right',
  className = '' 
}) => {
  const slideVariants = {
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' }
    },
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              'fixed top-0 bottom-0 w-96 bg-white shadow-2xl z-50 flex flex-col',
              side === 'right' ? 'right-0' : 'left-0',
              className
            )}
            initial={slideVariants[side].initial}
            animate={slideVariants[side].animate}
            exit={slideVariants[side].exit}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-secondary-100">
                <h2 className="text-xl font-display font-bold text-secondary-900">
                  {title}
                </h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
