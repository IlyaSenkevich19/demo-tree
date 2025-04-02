import { TRequestPayload } from "src/@types/types";
import { VITE_BASE_API_URL } from "@app/config/index.js";

export const buildFullUrl = (endpoint: string, queryParams: TRequestPayload): string => {
    const url = new URL(`${VITE_BASE_API_URL}${endpoint}`);
    const params = new URLSearchParams();

    for (const key in queryParams) {
        if (queryParams[key] !== undefined && queryParams[key] !== null) {
            params.append(key, String(queryParams[key]));
        };
    };

    url.search = params.toString();
    return url.toString();
};