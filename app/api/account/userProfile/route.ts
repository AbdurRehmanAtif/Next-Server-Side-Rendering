import User from "@/models/User";
import performNextRequest from "@/service/http/NextApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try {
        const response = await performNextRequest('http://localhost:5001/api/v1/profile', {
            method: "GET",
            headers: request.headers,
            cache: "no-store"
        });

        // Check if the response indicates that no data was found (assuming status code 404)
        if (response.statusCode === 404) {
            console.log("No data found for the requested profile");
            // Handle this case as needed
            return NextResponse.json({
                success: false,
                error: "No data found for the requested profile"
            });
        }
      

        return NextResponse.json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.log("error", error);
        // Handle other errors if needed
    }
}