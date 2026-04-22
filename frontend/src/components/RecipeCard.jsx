import { useState } from 'react';
import { Clock, ChefHat, Flame, Copy, RefreshCw, Check, Download } from 'lucide-react';

export default function RecipeCard({ recipe, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    const text = `
${recipe.dish_name}
Cuisine: ${recipe.cuisine} | Time: ${recipe.cooking_time} | Difficulty: ${recipe.difficulty}

Ingredients:
${recipe.ingredients.map(i => '- ' + i).join('\n')}

Instructions:
${recipe.instructions.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveLocal = () => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes') || '[]');
    savedRecipes.push(recipe);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-600 p-6 sm:p-8 text-white relative">
        <h2 className="text-3xl font-bold mb-4 pr-12">{recipe.dish_name}</h2>
        
        <div className="flex flex-wrap gap-4 text-emerald-50 text-sm font-medium">
          <div className="flex items-center bg-emerald-700/50 px-3 py-1.5 rounded-full">
            <ChefHat size={16} className="mr-2" />
            {recipe.cuisine || "Any"}
          </div>
          <div className="flex items-center bg-emerald-700/50 px-3 py-1.5 rounded-full">
            <Clock size={16} className="mr-2" />
            {recipe.cooking_time}
          </div>
          <div className="flex items-center bg-emerald-700/50 px-3 py-1.5 rounded-full">
            <Flame size={16} className="mr-2" />
            {recipe.difficulty}
          </div>
        </div>

        <div className="absolute top-6 right-6 flex gap-2">
          <button 
            onClick={handleCopy}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
          <button 
            onClick={handleSaveLocal}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            title="Save to local storage"
          >
            {saved ? <Check size={20} /> : <Download size={20} />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            Ingredients
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recipe.ingredients.map((ingredient, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-emerald-500 mr-2 font-bold">•</span>
                <span className="text-slate-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            Instructions
          </h3>
          <ol className="space-y-4">
            {recipe.instructions.map((step, idx) => (
              <li key={idx} className="flex">
                <span className="font-bold text-emerald-600 bg-emerald-50 rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-4">
                  {idx + 1}
                </span>
                <span className="text-slate-700 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={onRegenerate}
            className="flex items-center text-emerald-600 font-medium hover:text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <RefreshCw size={18} className="mr-2" />
            Regenerate Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
