import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ChefHat, X, ArrowLeft, Utensils, Minus, Plus, Heart, Bookmark, Share2, Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from './react-bits';
import { Button } from './react-bits';
import { Badge } from './react-bits';
import { Modal } from './react-bits';
import { Slider } from './ui/Slider';
import { cn } from '../theme/tokens';

export const RecipeDetails = ({ recipe, onBack }) => {
  const [servings, setServings] = useState(recipe.servings || 4);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const scaledIngredients = useMemo(() => {
    const scale = servings / (recipe.servings || 4);
    return recipe.ingredients?.map(ingredient => ({
      ...ingredient,
      amount: (ingredient.amount * scale).toFixed(1)
    })) || [];
  }, [recipe.ingredients, servings, recipe.servings]);

  const scaledNutrition = useMemo(() => {
    if (!recipe.nutrition) return null;
    const scale = servings / (recipe.servings || 4);
    return Object.entries(recipe.nutrition).reduce((acc, [key, value]) => {
      acc[key] = Math.round(value * scale);
      return acc;
    }, {});
  }, [recipe.nutrition, servings, recipe.servings]);

  const getBadgeVariant = (type) => {
    const variants = {
      'vegetarian': 'success',
      'vegan': 'success',
      'gluten-free': 'warning',
      'dairy-free': 'warning',
      'quick': 'info',
      'easy': 'info',
      'healthy': 'success',
      'comfort': 'secondary'
    };
    return variants[type] || 'default';
  };

  return (
    <motion.div
      className="min-h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <motion.img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Navigation */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-white/20"
          >
            <ArrowLeft size={20} />
            Back
          </Button>
          
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorited(!isFavorited)}
              className={cn(
                "bg-white/20 backdrop-blur-sm border-white/20 transition-all duration-200",
                isFavorited 
                  ? "text-red-400 hover:bg-red-500/20" 
                  : "text-white hover:bg-white/30"
              )}
            >
              <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={cn(
                "bg-white/20 backdrop-blur-sm border-white/20 transition-all duration-200",
                isBookmarked 
                  ? "text-yellow-400 hover:bg-yellow-500/20" 
                  : "text-white hover:bg-white/30"
              )}
            >
              <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-white/20"
            >
              <Share2 size={20} />
            </Button>
          </div>
        </div>

        {/* Recipe Title Overlay */}
        <div className="absolute bottom-8 left-8 right-8">
          <motion.h1
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {recipe.title}
          </motion.h1>
          <motion.p
            className="text-white/90 text-lg max-w-2xl leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {recipe.description}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Recipe Badges & Meta */}
        <motion.div
          className="mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-wrap gap-3 mb-8">
            {recipe.tags?.map((tag, index) => (
              <Badge
                key={index}
                variant={getBadgeVariant(tag)}
                className="px-4 py-2 text-sm font-medium shadow-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-600">
              <Clock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{recipe.cookTime}</div>
              <div className="text-sm text-gray-300">Cook Time</div>
            </div>
            <div className="text-center p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-600">
              <Users className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{servings}</div>
              <div className="text-sm text-gray-300">Servings</div>
            </div>
            <div className="text-center p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-600">
              <Star className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{recipe.rating}</div>
              <div className="text-sm text-gray-300">Rating</div>
            </div>
            <div className="text-center p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-600">
              <ChefHat className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{recipe.difficulty}</div>
              <div className="text-sm text-gray-300">Difficulty</div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Ingredients */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Card className="sticky top-8 shadow-xl border-0 bg-gray-800/90 backdrop-blur-sm border border-gray-600">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-display font-bold text-white flex items-center space-x-3">
                    <Utensils size={28} className="text-orange-500" />
                    <span>Ingredients</span>
                  </h2>
                </div>
                
                {/* Servings Scaler */}
                <div className="flex items-center space-x-4 mt-6 p-4 bg-gray-700 rounded-xl">
                  <span className="text-sm font-medium text-gray-300">Servings:</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="text-lg font-bold text-orange-500 min-w-[2rem] text-center">
                      {servings}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setServings(servings + 1)}
                      className="w-8 h-8 p-0 rounded-full"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scaledIngredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl hover:from-gray-600 hover:to-gray-500 transition-all duration-200 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-gray-200 font-medium group-hover:text-white">
                        {ingredient.name}
                      </span>
                      <span className="text-orange-500 font-bold bg-gray-800 px-3 py-1 rounded-full text-sm shadow-sm">
                        {ingredient.amount} {ingredient.unit}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Instructions & Steps */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Card className="shadow-xl border-0 bg-gray-800/90 backdrop-blur-sm border border-gray-600">
              <CardHeader>
                <h2 className="text-2xl font-display font-bold text-white flex items-center space-x-3">
                  <ChefHat size={28} className="text-orange-500" />
                  <span>Instructions</span>
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recipe.instructions?.map((step, index) => (
                    <motion.div
                      key={index}
                      className="flex space-x-4 p-6 bg-gradient-to-r from-gray-700 to-gray-600 rounded-2xl hover:from-gray-600 hover:to-gray-500 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-200 leading-relaxed font-medium group-hover:text-white transition-colors duration-200">
                          {step}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Information */}
            {scaledNutrition && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Card className="shadow-xl border-0 bg-gray-800/90 backdrop-blur-sm border border-gray-600">
                  <CardHeader>
                    <h3 className="text-xl font-display font-bold text-white">
                      Nutrition Facts
                    </h3>
                    <p className="text-sm text-gray-300">Per serving ({servings} servings)</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(scaledNutrition).map(([key, value]) => (
                        <div key={key} className="text-center p-4 bg-gray-700 rounded-xl">
                          <div className="text-2xl font-bold text-orange-500">{value}</div>
                          <div className="text-sm text-gray-300 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
