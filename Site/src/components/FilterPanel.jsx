import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Card } from './react-bits';
import { Input } from './react-bits';
import { Button } from './react-bits';
import { Badge } from './react-bits';
import { Select } from './react-bits';
import { Slider } from './ui/Slider';
import { getCuisines, getDietaryOptions } from '../data/recipes';
import { cn } from '../theme/tokens';

export const FilterPanel = ({ filters, onFiltersChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const cuisines = getCuisines();
  const dietaryOptions = getDietaryOptions();

  const handleFilterChange = (key, value) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onFiltersChange(tempFilters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      cuisine: '',
      dietary: '',
      maxCookTime: ''
    };
    setTempFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className={cn('relative', className)}>
      <Button
        variant="outline"
        size="md"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <Filter size={18} />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <Badge variant="primary" size="sm" className="ml-1">
            {activeFiltersCount}
          </Badge>
        )}
        <ChevronDown 
          size={16} 
          className={cn(
            'transition-transform duration-200 ml-1',
            isOpen && 'rotate-180'
          )}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute top-full left-0 mt-2 w-80 z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="p-8 shadow-xl bg-gray-800 border-gray-600">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    Filter Recipes
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="p-2"
                  >
                    <X size={20} />
                  </Button>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Cuisine
                    </label>
                    <Select
                      value={tempFilters.cuisine}
                      onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                      placeholder="Any cuisine"
                    >
                      {cuisines.map(cuisine => (
                        <option key={cuisine} value={cuisine}>
                          {cuisine}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Dietary Preferences
                    </label>
                    <Select
                      value={tempFilters.dietary}
                      onChange={(e) => handleFilterChange('dietary', e.target.value)}
                      placeholder="Any dietary preference"
                    >
                      {dietaryOptions.map(option => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Max Cook Time (minutes)
                    </label>
                    <Input
                      type="number"
                      value={tempFilters.maxCookTime}
                      onChange={(e) => handleFilterChange('maxCookTime', e.target.value)}
                      placeholder="Any cook time"
                      min="1"
                      max="180"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-600">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="px-4 py-2"
                  >
                    Clear All
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={applyFilters}
                    className="px-6 py-2"
                  >
                    Apply Filters
                  </Button>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
