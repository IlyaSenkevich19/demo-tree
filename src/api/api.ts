import { IApiResponse, TRequestPayload } from "src/@types/types";
import { apiRequest } from "./baseApi";

export const treeApi = {
    fetchTree: (payload: TRequestPayload): Promise<IApiResponse> => {
        return apiRequest('.get', 'POST', null, payload);
    },

    createNode: (payload: TRequestPayload): Promise<IApiResponse> => {
        return apiRequest('.node.create', 'POST', null, payload);
    },

    deleteNode: (payload: TRequestPayload): Promise<IApiResponse> => {
        return apiRequest('.node.delete', 'POST', null, payload);
    },

    renameNode: (payload: TRequestPayload): Promise<IApiResponse> => {
        return apiRequest('.node.rename', 'POST', null, payload);
    }
}
