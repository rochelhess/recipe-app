const EDITABLE_FIELDS = [
  "title",
  "description",
  "image",
  "prepTime",
  "cookTime",
  "servings",
  "ingredients",
  "instructions",
];

export function pickFields(body) {
  const data = {};

  for (const field of EDITABLE_FIELDS) {
    if (body?.[field] !== undefined) {
      data[field] = body[field];
    }
  }

  return data;
}
