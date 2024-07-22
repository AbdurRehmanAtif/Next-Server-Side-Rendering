import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { useAuth } from './context/AuthProvider';


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    
    // if (request.nextUrl.pathname.startsWith('/api/v1/login')) {
    //     return NextResponse.next();
    // }

    if (request.nextUrl.pathname.startsWith('/myaccount/')) {

        return NextResponse.next({
            request: {
                headers: request.headers
            }
        });
    }

    //     const token = request.cookies.get("tokean")?.value

    //     if (token == undefined) {
    //         console.log("Returned from Header from middleware setup _______________________")
    //         return NextResponse.redirect(new URL('/', request.url), {
    //             status: 302, // HTTP status code for redirection (302 for temporary, 301 for permanent)
    //             statusText: 'Found', // Status text (optional)
    //             headers: {
    //                 'Location': '/', // Destination URL
    //                 'X-Message': 'You are being redirected to the new page!', // Custom message
    //             },
    //         });
    //     }

    //     // console.log("Header from middleware setup _______________________")
    //     // all good create a new header
    //     // const headers = new Headers(request.headers);
    //     // headers.set('token', token)
    //     return NextResponse.next();

    // }
    // if (request.nextUrl.pathname.startsWith('/myaccount')) {
    //     const token = request.cookies.get("token")?.value;
    //     console.log("token 888 ", token)
    //     console.log("middleware working ___________")
    //     const token = request.cookies.get("token")?.value;
    //     // if (!token) {
    //     //     // Redirect to home page if token is undefined, null, or empty
    //     //     return NextResponse.rewrite(new URL('/', request.url))
    //     // }

    //     console.log("token ", token)

    // const requestHeaders = new Headers();
    // requestHeaders.set('authorization', "Bearer " + token);
    //     requestHeaders.set('session', request.cookies.get("session")!.value);
    //     requestHeaders.set('content-type', 'application/json');

    //     // Return a new response with modified headers
    //     return new NextResponse(null, {
    //         headers: requestHeaders
    //     });

    // }

    // If the path doesn't match any condition, pass the request to the next middleware
    // return NextResponse.next({
    //     headers: requestHeaders
    // })
    // return NextResponse.next({
    //     headers: requestHeaders
    // });
    //}
    return NextResponse.next()
}

export const config = {
    matcher: '/myaccount/:path*',
}