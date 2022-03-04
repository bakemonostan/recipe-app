import { BrowserRouter, Routes, Route } from 'react-router-dom';

// * Page Components
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';
import { useTheme } from './Hooks/useTheme';

// * CSS style
import './App.css';
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';

function App() {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/search' element={<Search />} />
          <Route path='/recipe' element={<Recipe />} />
          <Route path='/recipe/:id' element={<Recipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
