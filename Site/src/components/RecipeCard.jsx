import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Star, Heart, Bookmark, ChefHat, Flame } from 'lucide-react';
import { Card } from './react-bits';
import { Badge } from './react-bits';
import { cn } from '../theme/tokens';
import { useFavorites } from '../contexts/FavoritesContext';

const RecipeCard = ({ recipe, onClick, variant = 'default', className = '' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const getBadgeVariant = (badgeText) => {
    switch (badgeText?.toLowerCase()) {
      case 'trending': return 'error';
      case 'new': return 'success';
      case 'spicy': return 'warning';
      case 'healthy': return 'success';
      case 'vegan': return 'accent';
      case 'chef\'s choice': return 'primary';
      default: return 'default';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-secondary-600';
    }
  };

  const isCompact = variant === 'compact';

  return (
    <motion.div
      ref={ref}
      className={cn(
        'group cursor-pointer',
        className
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : 50 
      }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={cn(
        'overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300',
        'bg-slate-800/90 backdrop-blur-md border border-slate-600/40',
        'hover:bg-gray-800/95 hover:border-orange-500/30',
        isCompact ? 'h-80' : 'h-96'
      )}>
        {/* Image Container */}
        <div className={cn(
          'relative overflow-hidden',
          isCompact ? 'h-40' : 'h-48'
        )}>
          {/* Image */}
          <motion.img
            src={recipe.image}
            alt={recipe.title}
            className={cn(
              'w-full h-full object-cover transition-all duration-500',
              'group-hover:scale-110',
              'opacity-100'
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Image Loading Skeleton */}
          {!imageLoaded && recipe.image && (
            <div className="absolute inset-0 bg-secondary-200 animate-pulse flex items-center justify-center">
              <ChefHat size={32} className="text-secondary-400" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <motion.button
              onClick={handleFavorite}
              className={cn(
                'p-2 rounded-full backdrop-blur-sm transition-all duration-200',
                isFavorite(recipe.id) 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'bg-white/90 text-secondary-600 hover:bg-white hover:text-red-500'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={16} className={isFavorite(recipe.id) ? 'fill-current' : ''} />
            </motion.button>
            
            <motion.button
              onClick={handleBookmark}
              className={cn(
                'p-2 rounded-full backdrop-blur-sm transition-all duration-200',
                isBookmarked 
                  ? 'bg-primary-500 text-white shadow-lg' 
                  : 'bg-white/90 text-secondary-600 hover:bg-white hover:text-primary-500'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bookmark size={16} className={isBookmarked ? 'fill-current' : ''} />
            </motion.button>
          </div>

          {/* Rating Badge */}
          {recipe.rating && (
            <div className="absolute top-3 left-3">
              <motion.div
                className="flex items-center space-x-1 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Star size={14} className="text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-secondary-800">
                  {recipe.rating}
                </span>
              </motion.div>
            </div>
          )}

          {/* Trending Indicator */}
          {recipe.badges?.includes('Trending') && (
            <div className="absolute bottom-3 left-3">
              <motion.div
                className="flex items-center space-x-1 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-3 py-1 shadow-lg"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Flame size={14} />
                <span className="text-xs font-bold">TRENDING</span>
              </motion.div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={cn(
          'p-4 flex flex-col',
          isCompact ? 'space-y-2' : 'space-y-3'
        )}>
          {/* Title */}
          <h3 className={cn(
            'font-display font-bold text-orange-300 group-hover:text-orange-400 transition-colors duration-200 drop-shadow-lg',
            isCompact ? 'text-lg' : 'text-xl'
          )}>
            {recipe.title}
          </h3>

          {/* Description */}
          {!isCompact && recipe.description && (
            <p className="text-gray-200 text-sm line-clamp-2 leading-relaxed drop-shadow-sm">
              {recipe.description}
            </p>
          )}

          {/* Badges */}
          {recipe.badges && recipe.badges.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {recipe.badges.slice(0, isCompact ? 2 : 3).map((badge, index) => (
                <Badge
                  key={index}
                  variant={getBadgeVariant(badge)}
                  size="sm"
                  className="text-xs"
                >
                  {badge}
                </Badge>
              ))}
              {recipe.badges.length > (isCompact ? 2 : 3) && (
                <Badge variant="default" size="sm" className="text-xs">
                  +{recipe.badges.length - (isCompact ? 2 : 3)}
                </Badge>
              )}
            </div>
          )}

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
            <div className="flex items-center space-x-4 text-gray-200">
              {/* Cook Time */}
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span className="text-xs font-medium">
                  {recipe.cookTime || recipe.prepTime || '30m'}
                </span>
              </div>

              {/* Servings */}
              {recipe.servings && (
                <div className="flex items-center space-x-1">
                  <Users size={14} />
                  <span className="text-xs font-medium">
                    {recipe.servings}
                  </span>
                </div>
              )}

              {/* Difficulty */}
              {recipe.difficulty && !isCompact && (
                <div className="flex items-center space-x-1">
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    recipe.difficulty?.toLowerCase() === 'easy' && 'bg-green-500',
                    recipe.difficulty?.toLowerCase() === 'medium' && 'bg-yellow-500',
                    recipe.difficulty?.toLowerCase() === 'hard' && 'bg-red-500'
                  )} />
                  <span className={cn(
                    'text-xs font-medium capitalize',
                    getDifficultyColor(recipe.difficulty)
                  )}>
                    {recipe.difficulty}
                  </span>
                </div>
              )}
            </div>

            {/* Cuisine */}
            {recipe.cuisine && !isCompact && (
              <div className="text-xs text-gray-200 font-medium bg-gray-800/80 px-2 py-1 rounded-full border border-gray-600/30">
                {recipe.cuisine}
              </div>
            )}
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10 blur-xl" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default RecipeCard;
