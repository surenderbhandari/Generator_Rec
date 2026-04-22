import { useState } from 'react';
import { ChefHat } from 'lucide-react';
import InputForm from './components/InputForm';
import RecipeCard from './components/RecipeCard';

function App() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastRequest, setLastRequest] = useState(null);

  const fetchRecipe = async (requestData) => {
    setLoading(true);
    setError(null);
    setLastRequest(requestData);
    
    try {
      const response = await fetch('http://localhost:8000/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipe. Make sure backend is running and API key is set.');
      }

      const data = await response.json();
      setRecipe(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastRequest) {
      fetchRecipe(lastRequest);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      <header className="mb-8 text-center max-w-2xl w-full">
        <div className="flex justify-center mb-4 text-emerald-600">
          <ChefHat size={48} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
          AI Recipe Generator
        </h1>
        <p className="text-lg text-slate-600">
          Enter what you have in your fridge, and let AI cook up a delicious recipe for you.
        </p>
      </header>

      <main className="w-full max-w-4xl grid gap-8 md:grid-cols-[350px_1fr] items-start">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-8">
          <h2 className="text-xl font-bold mb-4">Your Ingredients</h2>
          <InputForm onSubmit={fetchRecipe} isLoading={loading} />
        </div>

        <div className="w-full">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200">
              {error}
            </div>
          )}

          {loading ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center min-h-[400px]">
              <div className="animate-spin text-emerald-600 mb-4">
                <ChefHat size={40} />
              </div>
              <p className="text-slate-500 font-medium animate-pulse">Cooking up your recipe...</p>
            </div>
          ) : recipe ? (
            <RecipeCard recipe={recipe} onRegenerate={handleRegenerate} />
          ) : (
            <div className="bg-white/50 border border-dashed border-slate-300 rounded-2xl p-12 text-center text-slate-400 min-h-[400px] flex items-center justify-center">
              <p>Your recipe will appear here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
