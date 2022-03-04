import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../Hooks/useFetch';
import { useTheme } from '../../Hooks/useTheme';

import './Recipe.css';

function Recipe() {
  const { id } = useParams();

  const {
    data: recipe,
    error,
    isPending,
  } = useFetch(`http://localhost:3000/recipes/${id}`);

  const { mode } = useTheme();

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}</h2>
          <p> Takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className='method'>{recipe.method}</p>
        </>
      )}
    </div>
  );
}

export default Recipe;
