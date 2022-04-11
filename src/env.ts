const envToString = (value: string, defaultValue: string = "") =>
  process.env[value] ?? defaultValue;

export const env = {
  MONGODB_URI: envToString("MONGODB_URI"),
  MONGODB_DATABASE: envToString("MONGODB_DATABASE"),
  COUNT_API_URL: envToString("COUNT_API_URL"),
  COUNT_API_NAMESPACE: envToString("COUNT_API_NAMESPACE"),
  COUNT_API_INDEX: envToString("COUNT_API_INDEX"),
};
