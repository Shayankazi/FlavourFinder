export const recipes = [
  {
    id: 1,
    title: "Mediterranean Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&crop=center",
    description: "A vibrant, nutrient-packed bowl with quinoa, fresh vegetables, and tangy feta cheese",
    cuisine: "Mediterranean",
    dietary: ["vegetarian", "gluten-free", "high-protein"],
    cookTime: 25,
    servings: 4,
    rating: 4.8,
    featured: true,
    badgeText: "Trending",
    difficulty: "Easy",
    ingredients: [
      { name: "quinoa", amount: 1, unit: "cup" },
      { name: "cucumber", amount: 1, unit: "large" },
      { name: "cherry tomatoes", amount: 2, unit: "cups" },
      { name: "red onion", amount: 0.5, unit: "medium" },
      { name: "feta cheese", amount: 0.5, unit: "cup" },
      { name: "olive oil", amount: 3, unit: "tbsp" },
      { name: "lemon juice", amount: 2, unit: "tbsp" },
      { name: "fresh herbs", amount: 0.25, unit: "cup" }
    ],
    instructions: [
      "Rinse quinoa and cook according to package directions",
      "Dice cucumber, halve cherry tomatoes, and thinly slice red onion",
      "Whisk together olive oil, lemon juice, salt, and pepper",
      "Combine cooked quinoa with vegetables and dressing",
      "Top with crumbled feta and fresh herbs"
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 14,
      fiber: 6
    },
    tags: ["healthy", "quick", "meal-prep"]
  },
  {
    id: 2,
    title: "Spicy Thai Basil Chicken",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop&crop=center",
    description: "Authentic Thai stir-fry with aromatic basil and perfectly balanced heat",
    cuisine: "Thai",
    dietary: ["gluten-free", "dairy-free"],
    cookTime: 20,
    servings: 3,
    rating: 4.9,
    featured: false,
    badgeText: "Spicy",
    difficulty: "Medium",
    ingredients: [
      { name: "chicken breast", amount: 1, unit: "lb" },
      { name: "thai basil", amount: 1, unit: "cup" },
      { name: "garlic", amount: 4, unit: "cloves" },
      { name: "thai chilies", amount: 3, unit: "pieces" },
      { name: "fish sauce", amount: 2, unit: "tbsp" },
      { name: "soy sauce", amount: 1, unit: "tbsp" },
      { name: "brown sugar", amount: 1, unit: "tsp" },
      { name: "vegetable oil", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Slice chicken into thin strips",
      "Mince garlic and chilies",
      "Heat oil in wok over high heat",
      "Stir-fry chicken until cooked through",
      "Add garlic and chilies, cook 30 seconds",
      "Add sauces and sugar, toss to coat",
      "Remove from heat and stir in basil leaves"
    ],
    nutrition: {
      calories: 280,
      protein: 35,
      carbs: 8,
      fat: 12,
      fiber: 1
    },
    tags: ["spicy", "authentic", "quick"]
  },
  {
    id: 3,
    title: "Creamy Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&h=600&fit=crop&crop=center",
    description: "Rich and creamy Italian risotto with mixed mushrooms and parmesan",
    cuisine: "Italian",
    dietary: ["vegetarian"],
    cookTime: 45,
    servings: 4,
    rating: 4.7,
    featured: true,
    badgeText: "Chef's Choice",
    difficulty: "Hard",
    ingredients: [
      { name: "arborio rice", amount: 1.5, unit: "cups" },
      { name: "mixed mushrooms", amount: 8, unit: "oz" },
      { name: "vegetable broth", amount: 6, unit: "cups" },
      { name: "white wine", amount: 0.5, unit: "cup" },
      { name: "onion", amount: 1, unit: "medium" },
      { name: "parmesan cheese", amount: 0.75, unit: "cup" },
      { name: "butter", amount: 3, unit: "tbsp" },
      { name: "olive oil", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Heat broth in a separate pot and keep warm",
      "Sauté sliced mushrooms until golden, set aside",
      "Cook diced onion in olive oil until translucent",
      "Add rice and toast for 2 minutes",
      "Add wine and stir until absorbed",
      "Add warm broth one ladle at a time, stirring constantly",
      "Continue until rice is creamy and al dente (about 20 minutes)",
      "Stir in mushrooms, butter, and parmesan"
    ],
    nutrition: {
      calories: 380,
      protein: 14,
      carbs: 58,
      fat: 12,
      fiber: 3
    },
    tags: ["comfort-food", "italian", "creamy"]
  },
  {
    id: 4,
    title: "Korean BBQ Beef Bowls",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&h=600&fit=crop&crop=center",
    description: "Tender marinated beef with steamed rice and fresh vegetables",
    cuisine: "Korean",
    dietary: ["dairy-free"],
    cookTime: 30,
    servings: 4,
    rating: 4.6,
    featured: false,
    badgeText: "New",
    difficulty: "Medium",
    ingredients: [
      { name: "ribeye steak", amount: 1.5, unit: "lbs" },
      { name: "soy sauce", amount: 0.25, unit: "cup" },
      { name: "brown sugar", amount: 2, unit: "tbsp" },
      { name: "sesame oil", amount: 1, unit: "tbsp" },
      { name: "garlic", amount: 4, unit: "cloves" },
      { name: "ginger", amount: 1, unit: "tbsp" },
      { name: "jasmine rice", amount: 2, unit: "cups" },
      { name: "scallions", amount: 3, unit: "stalks" }
    ],
    instructions: [
      "Slice beef thinly against the grain",
      "Marinate beef in soy sauce, sugar, sesame oil, garlic, and ginger for 30 minutes",
      "Cook rice according to package directions",
      "Heat grill pan over high heat",
      "Cook marinated beef for 2-3 minutes per side",
      "Serve over rice with sliced scallions"
    ],
    nutrition: {
      calories: 420,
      protein: 32,
      carbs: 45,
      fat: 15,
      fiber: 2
    },
    tags: ["korean", "marinated", "rice-bowl"]
  },
  {
    id: 5,
    title: "Lemon Herb Salmon",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop&crop=center",
    description: "Perfectly flaked salmon with bright lemon and fresh herbs",
    cuisine: "American",
    dietary: ["gluten-free", "dairy-free", "keto", "high-protein"],
    cookTime: 20,
    servings: 4,
    rating: 4.8,
    featured: true,
    badgeText: "Healthy",
    difficulty: "Easy",
    ingredients: [
      { name: "salmon fillets", amount: 4, unit: "pieces" },
      { name: "lemon", amount: 2, unit: "large" },
      { name: "fresh dill", amount: 0.25, unit: "cup" },
      { name: "fresh parsley", amount: 0.25, unit: "cup" },
      { name: "olive oil", amount: 3, unit: "tbsp" },
      { name: "garlic", amount: 3, unit: "cloves" },
      { name: "capers", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Preheat oven to 400°F",
      "Place salmon on baking sheet lined with parchment",
      "Drizzle with olive oil and lemon juice",
      "Season with salt, pepper, and minced garlic",
      "Bake for 12-15 minutes until flakes easily",
      "Top with fresh herbs and capers before serving"
    ],
    nutrition: {
      calories: 290,
      protein: 35,
      carbs: 3,
      fat: 15,
      fiber: 1
    },
    tags: ["healthy", "omega-3", "quick"]
  },
  {
    id: 6,
    title: "Chocolate Avocado Mousse",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop&crop=center",
    description: "Decadent yet healthy chocolate mousse made with ripe avocados",
    cuisine: "Fusion",
    dietary: ["vegan", "gluten-free", "dairy-free"],
    cookTime: 15,
    servings: 6,
    rating: 4.5,
    featured: false,
    badgeText: "Vegan",
    difficulty: "Easy",
    ingredients: [
      { name: "ripe avocados", amount: 3, unit: "large" },
      { name: "cocoa powder", amount: 0.5, unit: "cup" },
      { name: "maple syrup", amount: 0.25, unit: "cup" },
      { name: "vanilla extract", amount: 1, unit: "tsp" },
      { name: "coconut milk", amount: 0.25, unit: "cup" },
      { name: "dark chocolate chips", amount: 0.25, unit: "cup" },
      { name: "sea salt", amount: 0.25, unit: "tsp" }
    ],
    instructions: [
      "Scoop avocado flesh into food processor",
      "Add cocoa powder, maple syrup, and vanilla",
      "Process until smooth and creamy",
      "Add coconut milk gradually until desired consistency",
      "Fold in melted chocolate chips",
      "Chill for at least 2 hours before serving",
      "Garnish with a pinch of sea salt"
    ],
    nutrition: {
      calories: 180,
      protein: 4,
      carbs: 20,
      fat: 12,
      fiber: 8
    },
    tags: ["dessert", "healthy", "vegan"]
  },
  {
    id: 7,
    title: "Classic Beef Tacos",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&h=600&fit=crop&crop=center",
    description: "Authentic Mexican tacos with seasoned ground beef and fresh toppings",
    cuisine: "Mexican",
    dietary: ["dairy-free"],
    cookTime: 25,
    servings: 4,
    rating: 4.6,
    featured: false,
    badgeText: "Popular",
    difficulty: "Easy",
    ingredients: [
      { name: "ground beef", amount: 1, unit: "lb" },
      { name: "taco seasoning", amount: 1, unit: "packet" },
      { name: "corn tortillas", amount: 8, unit: "pieces" },
      { name: "lettuce", amount: 2, unit: "cups" },
      { name: "tomatoes", amount: 2, unit: "medium" },
      { name: "onion", amount: 0.5, unit: "medium" },
      { name: "cilantro", amount: 0.25, unit: "cup" },
      { name: "lime", amount: 2, unit: "pieces" }
    ],
    instructions: [
      "Brown ground beef in a large skillet",
      "Add taco seasoning and water according to packet directions",
      "Simmer until sauce thickens",
      "Warm tortillas in dry skillet or microwave",
      "Dice tomatoes and onion, chop lettuce and cilantro",
      "Assemble tacos with beef and fresh toppings",
      "Serve with lime wedges"
    ],
    nutrition: {
      calories: 340,
      protein: 22,
      carbs: 28,
      fat: 16,
      fiber: 4
    },
    tags: ["mexican", "quick", "family-friendly"]
  },
  {
    id: 8,
    title: "Chicken Caesar Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop&crop=center",
    description: "Crisp romaine lettuce with grilled chicken, parmesan, and homemade dressing",
    cuisine: "American",
    dietary: ["gluten-free", "high-protein"],
    cookTime: 20,
    servings: 4,
    rating: 4.5,
    featured: true,
    badgeText: "Light",
    difficulty: "Easy",
    ingredients: [
      { name: "chicken breast", amount: 2, unit: "large" },
      { name: "romaine lettuce", amount: 2, unit: "heads" },
      { name: "parmesan cheese", amount: 0.5, unit: "cup" },
      { name: "caesar dressing", amount: 0.25, unit: "cup" },
      { name: "croutons", amount: 1, unit: "cup" },
      { name: "lemon", amount: 1, unit: "piece" },
      { name: "olive oil", amount: 2, unit: "tbsp" },
      { name: "black pepper", amount: 0.25, unit: "tsp" }
    ],
    instructions: [
      "Season chicken with salt and pepper",
      "Grill chicken until cooked through, about 6-7 minutes per side",
      "Let chicken rest, then slice into strips",
      "Wash and chop romaine lettuce",
      "Toss lettuce with caesar dressing",
      "Top with sliced chicken, parmesan, and croutons",
      "Serve with lemon wedges and extra pepper"
    ],
    nutrition: {
      calories: 285,
      protein: 28,
      carbs: 12,
      fat: 14,
      fiber: 3
    },
    tags: ["salad", "healthy", "protein-rich"]
  },
  {
    id: 9,
    title: "Vegetable Stir Fry",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop&crop=center",
    description: "Colorful mix of fresh vegetables in a savory Asian-inspired sauce",
    cuisine: "Asian",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    cookTime: 15,
    servings: 4,
    rating: 4.4,
    featured: false,
    badgeText: "Quick",
    difficulty: "Easy",
    ingredients: [
      { name: "broccoli", amount: 2, unit: "cups" },
      { name: "bell peppers", amount: 2, unit: "medium" },
      { name: "carrots", amount: 2, unit: "medium" },
      { name: "snap peas", amount: 1, unit: "cup" },
      { name: "soy sauce", amount: 3, unit: "tbsp" },
      { name: "sesame oil", amount: 1, unit: "tbsp" },
      { name: "garlic", amount: 3, unit: "cloves" },
      { name: "ginger", amount: 1, unit: "tbsp" }
    ],
    instructions: [
      "Cut all vegetables into bite-sized pieces",
      "Heat oil in large wok or skillet over high heat",
      "Add garlic and ginger, stir-fry for 30 seconds",
      "Add harder vegetables first (carrots, broccoli)",
      "Add remaining vegetables and stir-fry 3-4 minutes",
      "Add soy sauce and sesame oil",
      "Toss until vegetables are crisp-tender"
    ],
    nutrition: {
      calories: 120,
      protein: 5,
      carbs: 18,
      fat: 4,
      fiber: 6
    },
    tags: ["vegetarian", "healthy", "quick"]
  },
  {
    id: 10,
    title: "Margherita Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop&crop=center",
    description: "Classic Italian pizza with fresh mozzarella, basil, and tomato sauce",
    cuisine: "Italian",
    dietary: ["vegetarian"],
    cookTime: 35,
    servings: 4,
    rating: 4.7,
    featured: true,
    badgeText: "Classic",
    difficulty: "Medium",
    ingredients: [
      { name: "pizza dough", amount: 1, unit: "ball" },
      { name: "tomato sauce", amount: 0.5, unit: "cup" },
      { name: "fresh mozzarella", amount: 8, unit: "oz" },
      { name: "fresh basil", amount: 0.25, unit: "cup" },
      { name: "olive oil", amount: 2, unit: "tbsp" },
      { name: "garlic", amount: 2, unit: "cloves" },
      { name: "salt", amount: 0.5, unit: "tsp" },
      { name: "black pepper", amount: 0.25, unit: "tsp" }
    ],
    instructions: [
      "Preheat oven to 475°F",
      "Roll out pizza dough on floured surface",
      "Transfer to pizza stone or baking sheet",
      "Spread tomato sauce evenly over dough",
      "Tear mozzarella into pieces and distribute",
      "Drizzle with olive oil and season",
      "Bake 12-15 minutes until crust is golden",
      "Top with fresh basil before serving"
    ],
    nutrition: {
      calories: 320,
      protein: 16,
      carbs: 35,
      fat: 14,
      fiber: 2
    },
    tags: ["italian", "comfort-food", "classic"]
  },
  {
    id: 11,
    title: "Banana Pancakes",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&h=600&fit=crop&crop=center",
    description: "Fluffy pancakes with mashed banana and a hint of cinnamon",
    cuisine: "American",
    dietary: ["vegetarian"],
    cookTime: 20,
    servings: 4,
    rating: 4.6,
    featured: false,
    badgeText: "Breakfast",
    difficulty: "Easy",
    ingredients: [
      { name: "flour", amount: 1.5, unit: "cups" },
      { name: "ripe bananas", amount: 2, unit: "large" },
      { name: "milk", amount: 1, unit: "cup" },
      { name: "eggs", amount: 2, unit: "large" },
      { name: "baking powder", amount: 2, unit: "tsp" },
      { name: "cinnamon", amount: 0.5, unit: "tsp" },
      { name: "vanilla extract", amount: 1, unit: "tsp" },
      { name: "butter", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Mash bananas in a large bowl",
      "Whisk in milk, eggs, and vanilla",
      "In separate bowl, mix flour, baking powder, and cinnamon",
      "Combine wet and dry ingredients until just mixed",
      "Heat butter in skillet over medium heat",
      "Pour 1/4 cup batter per pancake",
      "Cook until bubbles form, flip and cook until golden",
      "Serve with maple syrup and sliced banana"
    ],
    nutrition: {
      calories: 280,
      protein: 8,
      carbs: 45,
      fat: 8,
      fiber: 3
    },
    tags: ["breakfast", "sweet", "family-friendly"]
  },
  {
    id: 12,
    title: "Greek Chicken Bowls",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop&crop=center",
    description: "Mediterranean-inspired bowls with marinated chicken and fresh vegetables",
    cuisine: "Greek",
    dietary: ["gluten-free", "high-protein"],
    cookTime: 30,
    servings: 4,
    rating: 4.8,
    featured: true,
    badgeText: "Trending",
    difficulty: "Medium",
    ingredients: [
      { name: "chicken thighs", amount: 2, unit: "lbs" },
      { name: "greek yogurt", amount: 0.5, unit: "cup" },
      { name: "cucumber", amount: 1, unit: "large" },
      { name: "cherry tomatoes", amount: 2, unit: "cups" },
      { name: "red onion", amount: 0.5, unit: "medium" },
      { name: "kalamata olives", amount: 0.5, unit: "cup" },
      { name: "feta cheese", amount: 0.5, unit: "cup" },
      { name: "lemon juice", amount: 3, unit: "tbsp" }
    ],
    instructions: [
      "Marinate chicken in lemon juice, olive oil, and herbs for 30 minutes",
      "Grill chicken until cooked through, about 6-8 minutes per side",
      "Dice cucumber, halve cherry tomatoes, slice red onion",
      "Make tzatziki with yogurt, cucumber, and garlic",
      "Slice cooked chicken",
      "Assemble bowls with chicken and vegetables",
      "Top with feta, olives, and tzatziki"
    ],
    nutrition: {
      calories: 380,
      protein: 32,
      carbs: 15,
      fat: 22,
      fiber: 4
    },
    tags: ["mediterranean", "healthy", "protein-rich"]
  }
];

// Helper functions for filtering and searching
export const getCuisines = () => {
  return [...new Set(recipes.map(recipe => recipe.cuisine))];
};

export const getDietaryOptions = () => {
  const allDietary = recipes.flatMap(recipe => recipe.dietary);
  return [...new Set(allDietary)];
};

export const getRecipeById = (id) => {
  return recipes.find(recipe => recipe.id === parseInt(id));
};

export const filterRecipes = (recipesToFilter, filters) => {
  return recipesToFilter.filter(recipe => {
    const matchesCuisine = !filters.cuisine || recipe.cuisine === filters.cuisine;
    const matchesDietary = !filters.dietary || recipe.dietary.includes(filters.dietary);
    const matchesSearch = !filters.search || 
      recipe.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesCookTime = !filters.maxCookTime || recipe.cookTime <= filters.maxCookTime;
    
    return matchesCuisine && matchesDietary && matchesSearch && matchesCookTime;
  });
};
