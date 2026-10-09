export const createPaletteName = (prompt: string) => {
  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const createName = (prompt: string) =>
    prompt
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((string, i) => {
        const lower = string.toLowerCase();
        return i === 0 ? lower : capitalize(lower);
      })
      .join("");

  return createName(prompt);
};
