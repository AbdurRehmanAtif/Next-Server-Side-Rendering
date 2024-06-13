import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    console.log("hellow im workig user details")

    return NextResponse.json({
        success: true,
        data: {
            "firstName": "Alex",
            "lastName": "Alex",
            "dob": "Alex",
            "mobile": "Alex"
        }
    })

    // try {
    //     const result = await fetch("http://localhost:5001/session/handshake",
    //         {
    //             method: 'GET',
    //             headers: request.headers
    //         })

    //     const response = await result.json()
    //     console.log("App route resposne", response)

    // } catch (error) {

    //     console.log(error)
    // }

    // return NextResponse.json({
    //     success: true,
    //     "statue": "I am working from api file"
    // })
}