const getEnvVar = (key, isCritical = true) => {
    if (!import.meta.env[key] && isCritical) {
        throw new Error(`Env variable ${key} is required`);
    }

    return import.meta.env[key] || '';
};

export const VITE_TREE_NAME = getEnvVar('VITE_TREE_NAME', false);
export const VITE_BASE_API_URL = getEnvVar('VITE_BASE_API_URL', false);