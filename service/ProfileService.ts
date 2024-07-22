import { Profile } from "@/app/auth/login/route";
import performNextRequest from "./http/NextApi";
import { NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import CustomError from "./CustomError";

export default class ProfileService {

    static async fetchProfileByToken<T>(token: string) {
        try {
            return await performNextRequest<T>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profile`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'authorization': "Bearer " + token
                },
            })
        } catch (err) {
            return undefined;
        }

    }

    static async saveProfile<T>(values: Profile, token: string) {

        const convertedData = {
            ...values,
            mobile: values.mobile?.toString()
        };



        try {
            return await performNextRequest<T>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profile`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'authorization': "Bearer " + token
                },
                body: convertedData
            })

        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode, error.success, error.error);
        }

    }


}