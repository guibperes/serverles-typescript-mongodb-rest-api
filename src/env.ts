const envToString = (value: string, defaultValue: string = "") =>
  process.env[value] ?? defaultValue;

export const env = {
  MONGODB_URI: envToString("MONGODB_URI"),
  MONGODB_DATABASE: envToString("MONGODB_DATABASE"),
};
