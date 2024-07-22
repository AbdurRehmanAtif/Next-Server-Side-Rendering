import { NextRequest, NextResponse } from "next/server"
import AuthService from "@/service/AuthService"
import { signupLoad } from "@/app/auth/signup/page";
import { ApiResponse } from "@/service/http/NextApi";


export async function POST(request: NextRequest) {

    try {
        
        const auth: ApiResponse<signupLoad> = await AuthService.signupWithEmail<signupLoad>(request)


        // return response;

    } catch (error: any) {
        return NextResponse.json({
            status: error?.statusCode | 401,
            success: error?.success,
            message: error?.message,
            error: error?.error,
        })
    }
}