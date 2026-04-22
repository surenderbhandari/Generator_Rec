import { useState } from 'react';
import { Utensils } from 'lucide-react';

export default function InputForm({ onSubmit, isLoading }) {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [isVegetarian, setIsVegetarian] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    onSubmit({
      ingredients: ingredients,
      cuisine: cuisine || undefined,
      diet: isVegetarian ? 'vegetarian' : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="ingredients" className="block text-sm font-medium text-slate-700 mb-1">
          Ingredients
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g. 2 tomatoes, 1 onion, chicken breast, rice..."
          className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 bg-slate-50 border min-h-[120px]"
          required
        />
      </div>

      <div>
        <label htmlFor="cuisine" className="block text-sm font-medium text-slate-700 mb-1">
          Cuisine (Optional)
        </label>
        <select
          id="cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 p-3 bg-slate-50 border"
        >
          <option value="">Any Cuisine</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Asian">Asian</option>
          <option value="Indian">Indian</option>
          <option value="American">American</option>
          <option value="Mediterranean">Mediterranean</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          id="vegetarian"
          type="checkbox"
          checked={isVegetarian}
          onChange={(e) => setIsVegetarian(e.target.checked)}
          className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
        />
        <label htmlFor="vegetarian" className="ml-2 block text-sm text-slate-700">
          Make it Vegetarian
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || !ingredients.trim()}
        className="mt-2 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Utensils className="mr-2" size={18} />
        {isLoading ? 'Generating...' : 'Generate Recipe'}
      </button>
    </form>
  );
}
