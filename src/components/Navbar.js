import { Link } from 'react-router-dom';
import { useTheme } from '../Hooks/useTheme';

import './Navbar.css';
import Searchbar from './Searchbar';

function Navbar() {
  const { color } = useTheme();
  return (
    <div className='navbar' style={{ background: color }}>
      <nav>
        <Link to='/' className='brand'>
          <h1>Home</h1>
        </Link>
        <p>Search</p>
        <Searchbar />
        <Link to='/create'>Create Recipe</Link>
      </nav>
    </div>
  );
}

export default Navbar;
