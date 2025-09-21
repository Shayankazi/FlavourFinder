import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Search, Heart, Bookmark, Calendar, Sparkles, Menu, X, User } from 'lucide-react';

const Navbar = ({ currentPage, onNavigate, onSearchToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'meal-planner', label: 'Meal Planner', icon: Calendar },
  ];

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-700' 
            : 'bg-gray-900/80 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavClick('recipes')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChefHat className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-400 to-accent-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  FlavorFinder
                </h1>
                <p className="text-xs text-gray-400 font-medium -mt-1">
                  Discover Amazing Recipes
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                      isActive
                        ? 'text-orange-400 bg-gray-800'
                        : 'text-gray-300 hover:text-orange-400 hover:bg-gray-800'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-6 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                        layoutId="activeTab"
                        initial={{ x: '-50%' }}
                        animate={{ x: '-50%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <motion.button
                onClick={() => onSearchToggle ? onSearchToggle() : handleNavClick('recipes')}
                className="p-2 text-gray-300 hover:text-orange-400 hover:bg-gray-800 rounded-xl transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={onSearchToggle ? "Toggle Search" : "Search Recipes"}
              >
                <Search size={20} />
              </motion.button>

              {/* Profile Button */}
              <motion.button
                onClick={() => handleNavClick('profile')}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  currentPage === 'profile'
                    ? 'text-orange-400 bg-gray-800'
                    : 'text-gray-300 hover:text-orange-400 hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <User size={20} />
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 text-gray-300 hover:text-orange-400 hover:bg-gray-800 rounded-xl transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-left transition-all duration-200 ${
                        isActive
                          ? 'text-orange-400 bg-gray-800'
                          : 'text-gray-300 hover:text-orange-400 hover:bg-gray-800'
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
