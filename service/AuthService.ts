import moment, { Moment } from "moment";
import sanitizer from "../utils/sanitizer";
import { json } from "stream/consumers";
import Helper from "@/utils/Helper";
import { NextRequest, NextResponse } from "next/server";
import CustomError from "./CustomError";
import performNextRequest, { ApiResponse } from "./http/NextApi";
import { Profile } from "@/app/components/auth/login/route";
import ProfileService from "./ProfileService";
import User from "@/models/User";
import { use } from "react";
require('dotenv').config();


// import Security from "../utils/security";

// type jwtData = {
//     token: string;
//     expires: moment.Moment;
// }

// type SessionData = {
//     id: string;
//     expires: number;
//     expires_at: moment.Moment;
// };
interface CookieInfo {
    value: string;
    name: string;
    expires: Date;
}
export default class AuthService {

    token = !!Helper.getCookieValue("token")
    session = !!Helper.getCookieValue("session")

    isTokenExist() {
        return this.token;
    }

    login(payload: any) {
        this.setTokenLocally(payload)
        return;
    }

    setTokenLocally(response: any) {
        const expires = moment().add(response.data.token.expires, 'seconds');
        // Store the token in local storage
        localStorage.setItem('token', response.data.token.token);
        localStorage.setItem('expiresIn', JSON.stringify(expires.valueOf()));
    }

    isAuthenticated() {

        return !!this.getToken()
    }

    logout() {

        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return true;
        // Remove the token from local storage
        // localStorage.removeItem('token');
        // localStorage.removeItem('ajx_user_traits');
        // localStorage.removeItem('expiresIn');
    }

    isLoggedIn() {
        return this.token;
    }



    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getToken() {
        return Helper.getCookieValue("token")
    }




    getRole() {
        return 'USER'
    }


    // getCookieValue(cookieName: string) {
    //     // Define the cookies string
    //     const cookies = document.cookie;
    //     console.log(cookies)
    //     // Split the cookies string into individual cookies
    //     const cookieArray = cookies.split("; ");

    //     // Initialize variable to store cookie value
    //     let cookieValue;

    //     // Loop through each cookie to find the matching name
    //     cookieArray.forEach(cookie => {
    //         const [key, value] = cookie.split("=");
    //         if (key === cookieName) {
    //             cookieValue = value;
    //         }
    //     });

    //     // Return the cookie value or null if not found
    //     return cookieValue || null;
    // }

    purgeSession(name: string) {
        console.log(name)
        //return document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    // getCookie(cookieName:string) {
    //     // Split the cookie string into individual cookies
    //     const cookiesArray = document.cookie.split(";");

    //     // Initialize variable to store cookie value
    //     let cookieValue;

    //     // Loop through each cookie to find the matching name
    //     cookiesArray.forEach(cookie => {
    //         const [name, value] = cookie.trim().split("=");
    //         if (name === cookieName) {
    //             cookieValue = value;
    //         }
    //     });

    //     // If cookie value is found, decode it and return
    //     if (cookieValue) {
    //         return decodeURIComponent(cookieValue);
    //     } else {
    //         return null; // Return null if cookie not found
    //     }
    // }


    static fetchHeaders(response: Response) {

        const headers = new Headers(response.headers);
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        // Parse the JSON string from the 'authorization' header
        const token = JSON.parse(headers.get("authorization")!).token
        const session = headers.get("session_id")!
        // Set cookies with token and session_id
        return { expiry, token, session }
    }


    static async attemptLoginWithEmail<Auth>(request: NextRequest) {
        return await performNextRequest<Auth>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/login`, {
            method: "POST",
            cache: "no-cache",
            body: await request.json(),
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
        })
    }




}
