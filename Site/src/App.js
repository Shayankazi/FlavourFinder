import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import { RecipeList } from './components/RecipeList';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { getRecipeById } from './data/recipes';

// Lazy load heavy components to improve initial bundle size
const RecipeDetails = lazy(() => import('./components/RecipeDetails').then(module => ({ default: module.RecipeDetails })));
const MealPlanner = lazy(() => import('./components/MealPlanner').then(module => ({ default: module.MealPlanner })));
const FilterPanel = lazy(() => import('./components/FilterPanel').then(module => ({ default: module.FilterPanel })));
const Profile = lazy(() => import('./components/Profile').then(module => ({ default: module.Profile })));

// Loading component for lazy-loaded components
const ComponentLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-300">Loading...</p>
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('recipes');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchToggleKey, setSearchToggleKey] = useState(0);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentPage('recipe-details');
  };

  const handleBackToList = () => {
    setSelectedRecipe(null);
    setCurrentPage('recipes');
  };

  const handlePageChange = (page) => {
    if (page === 'favorites') {
      setShowFavoritesOnly(true);
      setShowSuggestions(false);
      setCurrentPage('favorites');
    } else {
      setShowFavoritesOnly(false);
      setShowSuggestions(false);
      setCurrentPage(page);
    }
    setSelectedRecipe(null);
  };

  const handleSearchToggle = () => {
    setSearchToggleKey(prev => prev + 1);
  };



  // Preload critical components after initial render
  useEffect(() => {
    const preloadComponents = async () => {
      // Preload RecipeDetails as it's commonly used
      import('./components/RecipeDetails');
    };
    
    // Delay preloading to not interfere with initial render
    const timer = setTimeout(preloadComponents, 2000);
    return () => clearTimeout(timer);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'recipes':
        return (
          <RecipeList 
            onRecipeSelect={handleRecipeSelect}
            showFavoritesOnly={showFavoritesOnly}
            showSuggestions={showSuggestions}
            searchToggleKey={searchToggleKey}
          />
        );
      case 'favorites':
        return (
          <RecipeList 
            onRecipeSelect={handleRecipeSelect}
            showFavoritesOnly={true}
            showSuggestions={false}
            searchToggleKey={searchToggleKey}
            pageTitle="Your Favorite Recipes"
          />
        );
      case 'recipe-details':
        return selectedRecipe ? (
          <Suspense fallback={<ComponentLoader />}>
            <RecipeDetails 
              recipe={selectedRecipe}
              onBack={handleBackToList}
            />
          </Suspense>
        ) : null;
      case 'meal-planner':
        return (
          <Suspense fallback={<ComponentLoader />}>
            <MealPlanner />
          </Suspense>
        );
      case 'profile':
        return (
          <Suspense fallback={<ComponentLoader />}>
            <Profile />
          </Suspense>
        );
      default:
        return (
          <RecipeList 
            onRecipeSelect={handleRecipeSelect}
            showFavoritesOnly={showFavoritesOnly}
            showSuggestions={showSuggestions}
            searchToggleKey={searchToggleKey}
          />
        );
    }
  };

  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-black text-white" ref={containerRef}>
        <Navbar 
          currentPage={currentPage}
          onNavigate={handlePageChange}
          onSearchToggle={handleSearchToggle}
        />
        
        <AnimatePresence mode="wait">
          <motion.main
            key={currentPage + (selectedRecipe?.id || '')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }} // Reduced transition duration
            className="relative"
          >
            {renderPage()}
          </motion.main>
        </AnimatePresence>
      </div>
    </FavoritesProvider>
  );
}

export default App;
