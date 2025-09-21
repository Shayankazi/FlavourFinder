export const mealPlans = [
  {
    id: 1,
    name: "Healthy Week",
    description: "A balanced week of nutritious meals",
    days: [
      {
        date: "2024-01-15",
        meals: {
          breakfast: { recipeId: 1, servings: 1 },
          lunch: { recipeId: 5, servings: 1 },
          dinner: { recipeId: 2, servings: 2 }
        }
      },
      {
        date: "2024-01-16",
        meals: {
          breakfast: { recipeId: 6, servings: 1 },
          lunch: { recipeId: 1, servings: 1 },
          dinner: { recipeId: 3, servings: 2 }
        }
      },
      {
        date: "2024-01-17",
        meals: {
          breakfast: { recipeId: 5, servings: 1 },
          lunch: { recipeId: 4, servings: 1 },
          dinner: { recipeId: 1, servings: 2 }
        }
      }
    ]
  },
  {
    id: 2,
    name: "Quick & Easy",
    description: "Fast meals for busy weekdays",
    days: [
      {
        date: "2024-01-22",
        meals: {
          breakfast: { recipeId: 6, servings: 1 },
          lunch: { recipeId: 2, servings: 1 },
          dinner: { recipeId: 5, servings: 2 }
        }
      }
    ]
  }
];

export const weekDays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export const mealTypes = [
  { id: 'breakfast', name: 'Breakfast', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'lunch', name: 'Lunch', color: 'bg-green-100 text-green-800' },
  { id: 'dinner', name: 'Dinner', color: 'bg-blue-100 text-blue-800' },
  { id: 'snack', name: 'Snack', color: 'bg-purple-100 text-purple-800' }
];

// Helper functions
export const getMealPlanById = (id) => {
  return mealPlans.find(plan => plan.id === id);
};

export const generateShoppingList = (mealPlan, recipes, pantryItems) => {
  const allIngredients = [];
  
  mealPlan.days.forEach(day => {
    Object.values(day.meals).forEach(meal => {
      const recipe = recipes.find(r => r.id === meal.recipeId);
      if (recipe) {
        recipe.ingredients.forEach(ingredient => {
          const scaledAmount = ingredient.amount * meal.servings;
          allIngredients.push({
            ...ingredient,
            amount: scaledAmount,
            recipeTitle: recipe.title
          });
        });
      }
    });
  });

  // Group by ingredient name and sum amounts
  const groupedIngredients = allIngredients.reduce((acc, ingredient) => {
    const key = `${ingredient.name}-${ingredient.unit}`;
    if (acc[key]) {
      acc[key].amount += ingredient.amount;
      acc[key].recipes.push(ingredient.recipeTitle);
    } else {
      acc[key] = {
        ...ingredient,
        recipes: [ingredient.recipeTitle]
      };
    }
    return acc;
  }, {});

  // Check against pantry and mark what's needed
  const shoppingList = Object.values(groupedIngredients).map(ingredient => {
    const pantryItem = pantryItems.find(item => 
      item.name.toLowerCase() === ingredient.name.toLowerCase()
    );
    
    const inPantry = pantryItem ? pantryItem.quantity : 0;
    const needed = Math.max(0, ingredient.amount - inPantry);
    
    return {
      ...ingredient,
      inPantry,
      needed,
      shouldBuy: needed > 0
    };
  });

  return shoppingList.filter(item => item.shouldBuy);
};

export const getWeekDates = (startDate = new Date()) => {
  const dates = [];
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay()); // Start from Sunday
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push({
      date: date.toISOString().split('T')[0],
      dayName: weekDays[i],
      isToday: date.toDateString() === new Date().toDateString()
    });
  }
  
  return dates;
};
