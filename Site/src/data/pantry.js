export const pantryItems = [
  // Proteins
  { id: 1, name: "chicken breast", category: "protein", quantity: 2, unit: "lbs", expiryDays: 3 },
  { id: 2, name: "salmon fillets", category: "protein", quantity: 4, unit: "pieces", expiryDays: 2 },
  { id: 3, name: "eggs", category: "protein", quantity: 12, unit: "pieces", expiryDays: 14 },
  { id: 4, name: "tofu", category: "protein", quantity: 1, unit: "block", expiryDays: 7 },
  
  // Grains & Starches
  { id: 5, name: "quinoa", category: "grains", quantity: 2, unit: "cups", expiryDays: 365 },
  { id: 6, name: "arborio rice", category: "grains", quantity: 1, unit: "cup", expiryDays: 365 },
  { id: 7, name: "jasmine rice", category: "grains", quantity: 3, unit: "cups", expiryDays: 365 },
  { id: 8, name: "pasta", category: "grains", quantity: 1, unit: "lb", expiryDays: 730 },
  
  // Vegetables
  { id: 9, name: "cucumber", category: "vegetables", quantity: 2, unit: "large", expiryDays: 7 },
  { id: 10, name: "cherry tomatoes", category: "vegetables", quantity: 1, unit: "container", expiryDays: 5 },
  { id: 11, name: "red onion", category: "vegetables", quantity: 1, unit: "medium", expiryDays: 14 },
  { id: 12, name: "garlic", category: "vegetables", quantity: 1, unit: "head", expiryDays: 30 },
  { id: 13, name: "mixed mushrooms", category: "vegetables", quantity: 8, unit: "oz", expiryDays: 5 },
  { id: 14, name: "avocados", category: "vegetables", quantity: 3, unit: "large", expiryDays: 3 },
  { id: 15, name: "bell peppers", category: "vegetables", quantity: 3, unit: "pieces", expiryDays: 7 },
  
  // Dairy & Alternatives
  { id: 16, name: "feta cheese", category: "dairy", quantity: 8, unit: "oz", expiryDays: 14 },
  { id: 17, name: "parmesan cheese", category: "dairy", quantity: 1, unit: "cup", expiryDays: 30 },
  { id: 18, name: "butter", category: "dairy", quantity: 1, unit: "stick", expiryDays: 30 },
  { id: 19, name: "coconut milk", category: "dairy-alt", quantity: 2, unit: "cans", expiryDays: 365 },
  
  // Pantry Staples
  { id: 20, name: "olive oil", category: "oils", quantity: 1, unit: "bottle", expiryDays: 365 },
  { id: 21, name: "soy sauce", category: "condiments", quantity: 1, unit: "bottle", expiryDays: 730 },
  { id: 22, name: "fish sauce", category: "condiments", quantity: 1, unit: "bottle", expiryDays: 365 },
  { id: 23, name: "lemon", category: "citrus", quantity: 3, unit: "pieces", expiryDays: 14 },
  { id: 24, name: "ginger", category: "spices", quantity: 1, unit: "piece", expiryDays: 21 },
  { id: 25, name: "fresh herbs", category: "herbs", quantity: 1, unit: "bunch", expiryDays: 7 },
  { id: 26, name: "cocoa powder", category: "baking", quantity: 1, unit: "container", expiryDays: 730 },
  { id: 27, name: "maple syrup", category: "sweeteners", quantity: 1, unit: "bottle", expiryDays: 365 },
];

export const pantryCategories = [
  { id: "protein", name: "Proteins", color: "bg-red-100 text-red-800" },
  { id: "grains", name: "Grains & Starches", color: "bg-yellow-100 text-yellow-800" },
  { id: "vegetables", name: "Vegetables", color: "bg-green-100 text-green-800" },
  { id: "dairy", name: "Dairy", color: "bg-blue-100 text-blue-800" },
  { id: "dairy-alt", name: "Dairy Alternatives", color: "bg-purple-100 text-purple-800" },
  { id: "oils", name: "Oils & Fats", color: "bg-orange-100 text-orange-800" },
  { id: "condiments", name: "Condiments", color: "bg-gray-100 text-gray-800" },
  { id: "spices", name: "Spices & Seasonings", color: "bg-pink-100 text-pink-800" },
  { id: "herbs", name: "Fresh Herbs", color: "bg-emerald-100 text-emerald-800" },
  { id: "citrus", name: "Citrus", color: "bg-lime-100 text-lime-800" },
  { id: "baking", name: "Baking Supplies", color: "bg-amber-100 text-amber-800" },
  { id: "sweeteners", name: "Sweeteners", color: "bg-rose-100 text-rose-800" },
];

// Helper functions
export const getPantryByCategory = (category) => {
  return pantryItems.filter(item => item.category === category);
};

export const getExpiringItems = (days = 3) => {
  return pantryItems.filter(item => item.expiryDays <= days);
};

export const searchPantryItems = (query) => {
  return pantryItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const getPantryItemById = (id) => {
  return pantryItems.find(item => item.id === id);
};
