import { IApiResponse, TRequestPayload } from "../@types/types";

import { buildFullUrl } from "./helpers";
import { showToast } from '@helpers/toast';

export const apiRequest = async (
    endpoint: string,
    method: string = 'POST',
    body: unknown = null,
    queryParams: TRequestPayload = {}
): Promise<IApiResponse> => {
    const options: RequestInit = {
        method,
        headers: {
            'Accept': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined,
    };

    const fullUrl = buildFullUrl(endpoint, queryParams);
    try {
        let response = await fetch(fullUrl, options);

        if (!response.ok) {
            console.warn(`First attempt failed. Retrying...`);
            response = await fetch(fullUrl, options);
        }

        if (!response.ok) {
            const errorText = `Failed to ${method} ${fullUrl} after 2 attempts`;
            showToast(errorText);
            throw new Error(errorText);
        }

        const contentType = response.headers.get("Content-Type");
        const responseData: IApiResponse = {
            success: true,
            data: contentType && contentType.includes("application/json") ? [await response.json()] : [],
            error: ''
        };

        if (!responseData.data.length) {
            console.warn(`Response is not JSON. Content-Type: ${contentType}`);
        }

        return responseData;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

        showToast(errorMessage);
        throw error;
    }
};