import { RequestHandler } from "next/dist/server/next";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import CustomError from "../CustomError";

interface RequestOptions {
    method: string;
    headers?: any
    body?: any;
    cache?: any;
}
export interface ServerResponse<T> {
    statusCode: number
    success: boolean
    message: string
    error?: string
    data?: T
}
export interface ApiResponse<T> {
    body: ServerResponse<T>,
    response: Response
}


export default async function performNextRequest<T>(endpoint: string, options?: RequestOptions): Promise<ServerApiResponse<T>> {
    try {
        const response: Response = await fetch(endpoint, {
            method: options?.method || 'GET',
            headers: options?.headers,
            body: options?.body ? JSON.stringify(options.body) : undefined,
            cache: options?.cache || 'no-store'
        });

        const body: ServerResponse<T> = await response.json();

        if (!body.success) {
            throw new CustomError(body.message, body.statusCode, body.success, body.error);
        }

        const res: ApiResponse<T> = { body: body, response: response }
        return res;


    } catch (error: any) {
        throw new CustomError(error.message, error.statusCode, error.success, error.error);
    }
}

