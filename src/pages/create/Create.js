import { useState, useRef, useEffect } from 'react';
import { useFetch } from '../../Hooks/useFetch';
import { useNavigate } from 'react-router-dom';

import './Create.css';

function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredient] = useState([]);
  const ingredientsInput = useRef(null);

  let navigate = useNavigate();

  const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST');

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes',
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredient((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient('');
    ingredientsInput.current.focus();
  };

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <div className='create'>
      <h2 className='page-title'>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients</span>
          <div className='ingredients'>
            <input
              type='text'
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientsInput}
            />
            <button onClick={handleAdd}>Add</button>
          </div>
        </label>
        <p>
          Current Ingredients:{' '}
          {ingredients.map((i) => (
            <em key={i}>{i}</em>
          ))}
        </p>

        <label>
          <span>Recipe Method:</span>
          <input
            type='textarea'
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>Cooking Time (Minutes):</span>
          <input
            type='number'
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Create;
