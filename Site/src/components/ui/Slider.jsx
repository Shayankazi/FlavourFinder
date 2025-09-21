import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../theme/tokens';

export const Slider = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 10, 
  step = 1,
  className = '',
  label,
  ...props 
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider"
          {...props}
        />
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-primary-600 rounded-full shadow-md pointer-events-none"
          style={{ left: `calc(${percentage}% - 10px)` }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </div>
      <div className="flex justify-between text-xs text-secondary-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
