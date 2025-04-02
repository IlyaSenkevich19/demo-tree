export interface ITreeNode {
    id: number;
    name: string;
    children?: ITreeNode[];
}

export enum EActionTypes {
    ADD = 'add',
    EDIT = 'edit',
    DELETE = 'delete',
}

export type TShowModal =
    | { type: EActionTypes.ADD; id: number; name?: string }
    | { type: EActionTypes.EDIT; id: number; name: string }
    | { type: EActionTypes.DELETE; id: number }
    | null;

export interface IApiResponse {
    success: boolean;
    data: ITreeNode[];
    error?: string;
}

export type TRequestPayload = Record<string, any>;