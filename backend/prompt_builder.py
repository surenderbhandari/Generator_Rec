def build_recipe_prompt(ingredients: str, cuisine: str = None, diet: str = None) -> str:
    prompt = f"""You are a professional chef AI.
Given these ingredients: {ingredients}

"""
    if cuisine:
        prompt += f"Preferred cuisine: {cuisine}\n"
    if diet:
        prompt += f"Dietary restriction: {diet}\n"

    prompt += """
Generate a recipe in JSON format ONLY.
Return strictly:
{
  "dish_name": "",
  "cuisine": "",
  "difficulty": "",
  "cooking_time": "",
  "ingredients": [],
  "instructions": []
}

Rules:
Do NOT include extra text
Do NOT include explanations
Output must be valid JSON
"""
    return prompt
