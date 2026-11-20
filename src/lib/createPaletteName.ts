// const capitalize = (word: string) =>
//   word.charAt(0).toUpperCase() + word.slice(1);

export const createPaletteName = (prompt: string) =>
  [...prompt.split(" ").slice(0, 3).join(" ")].slice(0, 50).join("") ||
  "untitled";
// [...prompt].slice(0, 50).join("") || "untitled";
//   .trim()
//   .split(/\s+/)
//   .slice(0, 2)
//   .map((word, i) => {
//     const lower = word.toLowerCase();
//     return i === 0 ? lower : capitalize(lower);
//   })
//   .join("") || "untitled";
