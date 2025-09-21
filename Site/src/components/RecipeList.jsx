import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, ChefHat, Sparkles, TrendingUp } from 'lucide-react';
import { Input } from './react-bits/Input';
import { Button } from './react-bits/Button';
import RecipeCard from './RecipeCard';
import { FilterPanel } from './FilterPanel';
import { recipes, filterRecipes } from '../data/recipes';
import { cn } from '../theme/tokens';
import { useFavorites } from '../contexts/FavoritesContext';
import Plasma from './Plasma';

// Memoized skeleton loader component
const RecipeCardSkeleton = React.memo(() => (
  <div className="card animate-pulse">
    <div className="h-48 bg-secondary-200 rounded-t-xl"></div>
    <div className="p-6 space-y-4">
      <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
      <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
      <div className="flex space-x-2">
        <div className="h-6 bg-secondary-200 rounded-full w-16"></div>
        <div className="h-6 bg-secondary-200 rounded-full w-20"></div>
      </div>
    </div>
  </div>
));

// Memoized recipe card wrapper to prevent unnecessary re-renders
const MemoizedRecipeCard = React.memo(({ recipe, onClick, variant, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      delay: Math.min(index * 0.05, 0.5), // Cap delay to prevent long waits
      duration: 0.3 // Reduced duration
    }}
  >
    <RecipeCard 
      recipe={recipe} 
      onClick={onClick}
      variant={variant}
    />
  </motion.div>
));

export const RecipeList = ({ onRecipeSelect, showFavoritesOnly = false, showSuggestions = false, searchToggleKey, pageTitle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(!showFavoritesOnly && !showSuggestions);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    dietary: '',
    maxCookTime: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { favorites } = useFavorites();
  const [visibleRecipes, setVisibleRecipes] = useState(6);

  // Memoized callback to prevent unnecessary re-renders
  const handleRecipeSelect = useCallback((recipe) => {
    onRecipeSelect(recipe);
  }, [onRecipeSelect]);

  // Handle search toggle from navbar
  React.useEffect(() => {
    if (searchToggleKey > 0) {
      setShowSearchBar(prev => !prev);
    }
  }, [searchToggleKey]);

  // Update filters when search query changes
  React.useEffect(() => {
    setFilters(prev => ({ ...prev, search: searchQuery }));
  }, [searchQuery]);

  // Simulate loading for better UX (reduced timeout)
  React.useEffect(() => {
    if (searchQuery || Object.values(filters).some(Boolean)) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 150); // Reduced from 300ms
      return () => clearTimeout(timer);
    }
  }, [searchQuery, filters]);

  // Optimized filtering with better memoization
  const filteredRecipes = useMemo(() => {
    let recipesToFilter = recipes;
    
    if (showFavoritesOnly) {
      recipesToFilter = recipes.filter(recipe => 
        favorites.includes(recipe.id)
      );
    } else if (showSuggestions) {
      recipesToFilter = recipes.filter(recipe => 
        (recipe.badgeText === 'Trending' || 
         recipe.badgeText === 'Popular' || 
         recipe.badgeText === 'Quick' || 
         recipe.badgeText === 'New' ||
         recipe.tags?.includes('quick') ||
         recipe.tags?.includes('popular') ||
         recipe.cookTime <= 20) && !recipe.featured
      );
    }
    
    const finalFiltered = filterRecipes(recipesToFilter, filters);
    return finalFiltered;
  }, [filters, showFavoritesOnly, showSuggestions, favorites]);

  // Memoized featured and trending recipes
  const featuredRecipes = useMemo(() => 
    recipes.filter(recipe => recipe.featured).slice(0, 6), []
  );

  const trendingRecipes = useMemo(() => 
    recipes.filter(recipe => recipe.badges?.includes('Trending')).slice(0, 4), []
  );

  const hasActiveFilters = searchQuery || Object.values(filters).some(Boolean);

  // Memoized quick search handler
  const handleQuickSearch = useCallback((tag) => {
    setSearchQuery(tag);
  }, []);

  // Memoized clear filters handler
  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setFilters({ search: '', cuisine: '', dietary: '', maxCookTime: '' });
  }, []);

  // Memoized show more handler
  const handleShowMore = useCallback(() => {
    setVisibleRecipes(prev => prev + 6);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Simplified Hero Section with reduced animations */}
      <motion.div 
        className="relative bg-black overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }} // Reduced duration
      >
        {/* Optimized Plasma Background */}
        <Plasma 
          color="#F97316" 
          speed={0.3} // Reduced speed
          direction="forward" 
          scale={1.2} // Slightly larger scale to reduce detail
          opacity={0.4} // Reduced opacity
          mouseInteractive={false} // Disabled for performance
        />
        
        {/* Simplified background pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="flex justify-center mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }} // Simplified animation
            >
              <div className="relative p-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl shadow-lg">
                <ChefHat size={56} className="text-primary-600" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles size={24} className="text-accent-500" />
                </div>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-6xl md:text-7xl font-display font-bold bg-gradient-to-r from-white via-orange-300 to-orange-500 bg-clip-text text-transparent mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {pageTitle || "Discover Amazing Recipes"}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Find the perfect recipe for any occasion. From quick weeknight dinners to impressive weekend feasts.
            </motion.p>

            {/* Enhanced Search Section */}
            {showSearchBar && (
              <motion.div 
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-600/20">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        icon={Search}
                        placeholder={showFavoritesOnly ? "Search your favorite recipes..." : "Search recipes, ingredients, or cuisines..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-lg h-14 bg-white/90 border-0 shadow-sm"
                      />
                    </div>
                    <FilterPanel
                      filters={filters}
                      onFiltersChange={setFilters}
                    />
                  </div>
                  
                  {/* Quick Search Suggestions */}
                  {!hasActiveFilters && (
                    <motion.div 
                      className="mt-6 flex flex-wrap gap-2 justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="text-sm text-secondary-500 mr-2">Popular:</span>
                      {['Pasta', 'Chicken', 'Vegetarian', 'Quick & Easy', 'Desserts'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleQuickSearch(tag)}
                          className="px-3 py-1 text-sm bg-secondary-100 hover:bg-primary-100 text-secondary-700 hover:text-primary-700 rounded-full transition-colors duration-200"
                        >
                          {tag}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="container py-16 bg-black text-white">
        {/* Results Summary */}
        {hasActiveFilters && (
          <motion.div 
            className="mb-8 flex items-center justify-between"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h2 className="text-2xl font-display font-bold text-white">
                {isLoading ? 'Searching...' : `Found ${filteredRecipes.length} recipes`}
              </h2>
              {searchQuery && (
                <p className="text-gray-300 mt-1">
                  Results for "<span className="font-medium text-orange-400">{searchQuery}</span>"
                </p>
              )}
            </div>
            {filteredRecipes.length > 0 && (
              <Button
                variant="ghost"
                onClick={handleClearFilters}
                className="text-secondary-500 hover:text-secondary-700"
              >
                Clear all filters
              </Button>
            )}
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {Array.from({ length: 6 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Search Results */}
        {!isLoading && hasActiveFilters && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRecipes.map((recipe, index) => (
                  <MemoizedRecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={handleRecipeSelect}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-secondary-100 rounded-full flex items-center justify-center">
                  <Search size={32} className="text-secondary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No recipes found</h3>
                <p className="text-gray-300 mb-6">Try adjusting your search or filters</p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                >
                  Clear filters
                </Button>
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Featured & Trending Sections (when no active filters) */}
        {!hasActiveFilters && !isLoading && !showFavoritesOnly && (
          <>
            {/* Trending Recipes */}
            {trendingRecipes.length > 0 && (
              <motion.section 
                className="mb-20"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="flex items-center mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl">
                      <TrendingUp size={24} className="text-red-600" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white">
                      Trending Now
                    </h2>
                  </div>
                  <div className="h-1 flex-1 bg-gradient-to-r from-red-200 via-orange-200 to-transparent ml-8 rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingRecipes.map((recipe, index) => (
                    <MemoizedRecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onClick={handleRecipeSelect}
                      variant="compact"
                      index={index}
                    />
                  ))}
                </div>
              </motion.section>
            )}

            {/* Featured Recipes */}
            {featuredRecipes.length > 0 && (
              <motion.section 
                className="mb-16"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="flex items-center mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-xl">
                      <Sparkles size={24} className="text-primary-600" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white">
                      Featured Recipes
                    </h2>
                  </div>
                  <div className="h-1 flex-1 bg-gradient-to-r from-primary-200 via-accent-200 to-transparent ml-8 rounded-full" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredRecipes.map((recipe, index) => (
                    <MemoizedRecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onClick={handleRecipeSelect}
                      index={index}
                    />
                  ))}
                </div>
              </motion.section>
            )}
          </>
        )}

        {/* All Recipes */}
        {!isLoading && (
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="flex items-center mb-10">
              <h2 className="text-3xl font-display font-bold text-white">
                {showFavoritesOnly ? 'Your Favorite Recipes' : 
                 showSuggestions ? 'Suggested Recipes' : 'All Recipes'}
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-secondary-200 to-transparent ml-8 rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(showFavoritesOnly || showSuggestions ? filteredRecipes : recipes.filter(recipe => !recipe.featured))
                .slice(0, visibleRecipes)
                .map((recipe, index) => (
                <MemoizedRecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={handleRecipeSelect}
                  index={index}
                />
              ))}
            </div>
            
            {/* Show More Button */}
            {((showFavoritesOnly || showSuggestions ? filteredRecipes : recipes.filter(recipe => !recipe.featured)).length > visibleRecipes) && (
              <motion.div 
                className="flex justify-center mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShowMore}
                  className="px-8 py-3 text-orange-400 border-orange-400 hover:bg-orange-400 hover:text-black"
                >
                  Show More Recipes
                </Button>
              </motion.div>
            )}
          </motion.section>
        )}
      </div>
    </div>
  );
};
