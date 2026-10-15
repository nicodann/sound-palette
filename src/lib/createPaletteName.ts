const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export const createPaletteName = (prompt: string) =>
  prompt
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word, i) => {
      const lower = word.toLowerCase();
      return i === 0 ? lower : capitalize(lower);
    })
    .join("") || "untitled";
