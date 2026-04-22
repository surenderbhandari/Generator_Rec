from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from ai_service import generate_recipe_from_ai

app = FastAPI(title="Recipe Generator API")

# Configure CORS so the frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecipeRequest(BaseModel):
    ingredients: str
    cuisine: Optional[str] = None
    diet: Optional[str] = None

@app.post("/generate-recipe")
async def generate_recipe(request: RecipeRequest):
    try:
        recipe = generate_recipe_from_ai(
            ingredients=request.ingredients,
            cuisine=request.cuisine,
            diet=request.diet
        )
        return recipe
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate recipe: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
