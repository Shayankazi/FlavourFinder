# 🍳 FlavourFinder

**Discover Amazing Recipes with AI-Powered Recipe Discovery**

FlavourFinder is a modern, full-stack recipe discovery platform that helps users find, save, and explore delicious recipes. The project consists of two main components: a beautiful landing page and a feature-rich recipe finder application.

## 🌟 Features

### Landing Page
- **Modern Design**: Clean, responsive landing page built with Vite
- **Fast Loading**: Optimized performance with Vite's build system
- **Interactive UI**: Engaging user interface with smooth animations

### Recipe Finder Application
- **Recipe Discovery**: Browse through a vast collection of recipes
- **Smart Search**: Find recipes by ingredients, cuisine, or dietary preferences
- **Favorites System**: Save your favorite recipes for quick access
- **Trending Recipes**: Discover what's popular in the cooking community
- **Featured Content**: Curated recipe collections
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Modern dark UI for comfortable browsing

## 🚀 Tech Stack

### Landing Page
- **Vite** - Fast build tool and development server
- **HTML5** - Modern markup
- **CSS3** - Styling with modern features
- **JavaScript** - Interactive functionality

### Recipe Finder App
- **React** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Context** - State management
- **Modern React Hooks** - Efficient state and effect management

## 📁 Project Structure

```
FlavourFinder/
├── LandingPage/          # Vite-based landing page
│   ├── src/
│   │   ├── main.js       # Entry point
│   │   ├── style.css     # Styles
│   │   └── pattern.svg   # Assets
│   ├── public/           # Static assets
│   ├── index.html        # Main HTML file
│   ├── package.json      # Dependencies
│   └── vite.config.js    # Vite configuration
│
└── Site/                 # React recipe finder app
    ├── src/
    │   ├── components/   # React components
    │   ├── contexts/     # React contexts
    │   ├── data/         # Recipe data
    │   ├── theme/        # Theme configuration
    │   ├── App.js        # Main app component
    │   └── index.tsx     # Entry point
    ├── public/           # Static assets
    ├── package.json      # Dependencies
    └── tailwind.config.js # Tailwind configuration
```

## 🛠️ Installation

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

### Landing Page Setup

1. Navigate to the LandingPage directory:
```bash
cd LandingPage
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

### Recipe Finder App Setup

1. Navigate to the Site directory:
```bash
cd Site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and visit: `http://localhost:3000`

## 🚀 Getting Started

### Quick Start (Both Projects)

1. **Clone the repository:**
```bash
git clone https://github.com/Shayankazi/FlavourFinder.git
cd FlavourFinder
```

2. **Start the Landing Page:**
```bash
cd LandingPage
npm install
npm run dev
```

3. **Start the Recipe App (in a new terminal):**
```bash
cd Site
npm install
npm start
```

### Production Build

#### Landing Page
```bash
cd LandingPage
npm run build
npm run preview
```

#### Recipe Finder App
```bash
cd Site
npm run build
npm run serve
```

## 📱 Usage

### Landing Page
- Visit the landing page to learn about FlavourFinder
- Navigate to the main application
- Explore the modern, responsive design

### Recipe Finder App
1. **Browse Recipes**: Explore trending and featured recipes on the home page
2. **Search**: Use the search functionality to find specific recipes
3. **Filter**: Apply filters for cuisine type, dietary restrictions, etc.
4. **Favorites**: Click the heart icon to save recipes to your favorites
5. **View Details**: Click on any recipe to see detailed instructions and ingredients

## 🎨 Customization

### Styling
- **Landing Page**: Modify `src/style.css` for custom styles
- **Recipe App**: Update Tailwind classes or modify `tailwind.config.js`

### Content
- **Recipes**: Add new recipes in `Site/src/data/`
- **Components**: Create new React components in `Site/src/components/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Shayan Kazi**
- GitHub: [@Shayankazi](https://github.com/Shayankazi)

## 🙏 Acknowledgments

- Thanks to the React and Vite communities for excellent documentation
- Inspiration from modern recipe platforms
- UI/UX design principles from contemporary web applications

---

**Happy Cooking! 🍽️**

*Find your next favorite recipe with FlavourFinder*