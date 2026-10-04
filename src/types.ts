export type User = {
  id: string;
  email: string;
};

export type SavedPalette = {
  id: string;
  prompt: string;
  colours: string[];
  adjectives: string[];
  createAt: string;
};

export type AiResponse = {
  adjective: string;
  colour: string;
}[];
