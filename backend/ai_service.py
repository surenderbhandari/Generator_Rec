import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
from prompt_builder import build_recipe_prompt

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    
model = genai.GenerativeModel("gemini-1.5-flash")

def generate_recipe_from_ai(ingredients: str, cuisine: str = None, diet: str = None) -> dict:
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY is not set. Please set it in the .env file.")
    
    prompt = build_recipe_prompt(ingredients, cuisine, diet)
    
    # We can enforce JSON output via response_mime_type in generation_config
    response = model.generate_content(
        prompt,
        generation_config={"response_mime_type": "application/json"}
    )
    
    try:
        return json.loads(response.text)
    except json.JSONDecodeError:
        # Fallback to try to clean up markdown
        text = response.text.strip()
        if text.startswith('```json'):
            text = text[7:-3].strip()
        elif text.startswith('```'):
            text = text[3:-3].strip()
        return json.loads(text)
