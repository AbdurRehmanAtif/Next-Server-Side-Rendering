import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/service/AuthService";
import { error } from "console";
import CustomError from "@/service/CustomError";
import ProfileService from "@/service/ProfileService";
import { ApiResponse } from "@/service/http/NextApi";
import User from "@/models/User";
import { useAuth } from "@/context/AuthProvider";

export interface Auth {
    email: string
    role: string
}
export interface Profile {
    firstName?: string
    lastName?: string
    email?:string
    dob?: string
    mobile?: string
    about?: string
    gender?: string
    avatar?: string
    coverImage?: string
}

export async function POST(request: NextRequest) {

    try {
        const auth: ApiResponse<Auth> = await AuthService.attemptLoginWithEmail<Auth>(request)
        const { expiry, token, session } = AuthService.fetchHeaders(auth.response)
        const profile: ApiResponse<Profile> = await ProfileService.fetchProfileByToken<Profile>(token)
        const response = NextResponse.json({
            auth: auth.body.data,
            profile: profile.body.data
        })
        response.cookies.set("token", token, { expires: expiry });
        response.cookies.set("session", session, { expires: expiry });
        return response;

    } catch (error: any) {
        return NextResponse.json({
            status: error?.statusCode | 401,
            success: error?.success,
            message: error?.message,
            error: error?.error,
        })
    }
}
