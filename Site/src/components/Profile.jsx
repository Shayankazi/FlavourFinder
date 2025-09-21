import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Clock, Star, Settings, ChefHat } from 'lucide-react';
import RecipeCard from './RecipeCard';
import { recipes } from '../data/recipes';
import { useFavorites } from '../contexts/FavoritesContext';

export const Profile = () => {
  const { favorites, favoriteCount } = useFavorites();
  
  // Sample user data
  const [user] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    joinDate: "March 2024",
    totalRecipes: 45,
    cookingLevel: "Intermediate",
    preferredCuisines: ["Italian", "Mediterranean", "Asian"]
  });

  const [activeTab, setActiveTab] = useState('favorites');

  // Get favorite recipes from global context (excluding featured recipes)
  const favoriteRecipes = recipes.filter(recipe => 
    favorites.includes(recipe.id) && !recipe.featured
  );

  // Get recently viewed recipes (sample)
  const recentlyViewed = recipes.slice(0, 4);

  const stats = [
    { label: "Recipes Cooked", value: user.totalRecipes, icon: ChefHat },
    { label: "Favorites", value: favoriteCount, icon: Heart },
    { label: "Cooking Level", value: user.cookingLevel, icon: Star },
    { label: "Member Since", value: user.joinDate, icon: Clock }
  ];

  const tabs = [
    { id: 'favorites', label: 'Favorite Recipes', count: favoriteCount },
    { id: 'recent', label: 'Recently Viewed', count: recentlyViewed.length },
    { id: 'settings', label: 'Settings', count: null }
  ];

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl shadow-sm p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-orange-100"
              />
              <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full">
                <User size={16} />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-gray-300 mb-4">{user.email}</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {user.preferredCuisines.map((cuisine) => (
                  <span
                    key={cuisine}
                    className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              <Settings size={16} />
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-600">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-900/30 rounded-lg mx-auto mb-2">
                  <stat.icon className="text-orange-500" size={20} />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-600">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-900/20'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className="ml-2 px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'favorites' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold text-white mb-6">Your Favorite Recipes</h2>
                {favoriteRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteRecipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onClick={() => {}}
                        isFavorite={true}
                        onToggleFavorite={() => {}}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No favorites yet</h3>
                    <p className="text-gray-300">Start exploring recipes and add them to your favorites!</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'recent' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold text-white mb-6">Recently Viewed</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentlyViewed.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onClick={() => {}}
                      isFavorite={user.favoriteRecipes.includes(recipe.id)}
                      onToggleFavorite={() => {}}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold text-white mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Dietary Restrictions
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'].map((diet) => (
                            <label key={diet} className="flex items-center">
                              <input type="checkbox" className="mr-2" />
                              <span className="text-sm text-gray-300">{diet}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Cooking Skill Level
                        </label>
                        <select className="w-full p-2 border border-gray-600 bg-gray-800 text-white rounded-lg">
                          <option>Beginner</option>
                          <option selected>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};