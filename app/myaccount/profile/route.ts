
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {


   const res = await fetch('http://localhost:5001/api/v1/profile', {
      cache: "no-cache",
      headers: request.headers
   })
   //    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/`, {
   //       cache: "no-cache"

   //   })
   console.log(await res.json())

   return NextResponse.json({
      "Data": ""
   })
}