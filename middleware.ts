import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {


    if (request.nextUrl.pathname.startsWith('/api/v1/login')) {
        return NextResponse.next()
    }

    if (request.nextUrl.pathname.startsWith('/api/')) {

        const token = request.cookies.get("token")?.value; // Using optional chaining to handle possible undefined
        if (!token) {
            // Redirect to home page if token is undefined, null, or empty
            return NextResponse.redirect('http://localhost:3000');
        }

        console.log("middleware also working")

        const requestHeaders = new Headers();
        requestHeaders.set('authorization', "Bearer " + token);
        requestHeaders.set('session', request.cookies.get("session")!.value);
        requestHeaders.set('content-type', 'application/json');
        request.cookies.set("Cookie", "")
        return NextResponse.next({
            request: {
                // New request headers
                headers: requestHeaders,
            },
        })
    }


}
// middleware.ts
export const config = {
    matcher: '/api/:path*',
};
