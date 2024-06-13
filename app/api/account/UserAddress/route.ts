import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    
    return NextResponse.json({
        success: true,
        data: {
            "firstName": "Alex",
            "lastName": "Alex",
            "dob": "Alex",
            "mobile": "Alex"
        }
    })
}