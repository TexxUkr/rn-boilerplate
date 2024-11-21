import { MMKV } from 'react-native-mmkv';
export const storage = new MMKV();

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export function loadString(key: string): string | null {
  try {
    return storage.getString(key) ?? null;
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function saveString(key: string, value: string): boolean {
  try {
    storage.set(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export function load<T>(key: string): T | null {
  let almostThere: string | null = null;
  try {
    almostThere = loadString(key);
    return JSON.parse(almostThere ?? '') as T;
  } catch {
    return (almostThere as T) ?? null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export function save(key: string, value: unknown): boolean {
  try {
    saveString(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export function remove(key: string): void {
  try {
    storage.delete(key);
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export function clear(): void {
  try {
    storage.clearAll();
  } catch {}
}

export const asyncSetItem = async (key: string, value: string | object) => {
  try {
    if (typeof value === 'string') {
      storage.set(key, value);
    } else {
      storage.set(key, JSON.stringify(value));
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const asyncGetItem = async (key: string): Promise<string | null> => {
  try {
    const value = storage.getString(key);
    if (value !== undefined) {
      return Promise.resolve(value);
    } else {
      return Promise.resolve(null);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const asyncRemoveItem = async (key: string): Promise<void> => {
  try {
    storage.delete(key); // Remove the key from storage
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};
