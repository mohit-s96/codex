/* eslint-disable no-console */
import keytar from "keytar";

// Service and account names for secure key storage.
const SERVICE_NAME = "@openai/codex";
const ACCOUNT_NAME = "OPENAI_API_KEY";

/**
 * Retrieve the API key from secure storage or, if not found, fall back to
 * the environment variable and store it securely for next time.
 *
 * @returns The OpenAI API key, or empty string if none is found.
 */
export async function getApiKey(): Promise<string> {
  try {
    const storedKey = await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
    if (storedKey) {
      return storedKey;
    }
  } catch (err) {
    console.warn(`codex: failed to read API key from secure storage: ${err}`);
  }

  // Fallback to environment variable
  const envKey = process.env["OPENAI_API_KEY"] || "";
  if (envKey) {
    try {
      await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, envKey);
    } catch (err) {
      console.warn(`codex: failed to save API key to secure storage: ${err}`);
    }
    return envKey;
  }

  return "";
}

/**
 * Persist the provided API key in secure storage.
 *
 * @param apiKey The OpenAI API key to store.
 */
export async function setApiKey(apiKey: string): Promise<void> {
  try {
    await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, apiKey);
  } catch (err) {
    console.warn(`codex: failed to save API key to secure storage: ${err}`);
  }
}

/**
 * Delete the stored API key from secure storage.
 *
 * @returns True if a key was deleted; false otherwise.
 */
export async function deleteApiKey(): Promise<boolean> {
  try {
    return await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
  } catch (err) {
    console.warn(`codex: failed to delete API key from secure storage: ${err}`);
    return false;
  }
}
