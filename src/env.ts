const envToString = (value: string, defaultValue: string = "") =>
  process.env[value] ?? defaultValue;

export const env = {
  MONGODB_URI: envToString("MONGODB_URI"),
};
