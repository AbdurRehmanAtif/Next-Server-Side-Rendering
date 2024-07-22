import { cookies } from "next/headers";
export default class Helper {

    static getCookie(cookieName: string): string {
        // Split the cookie string into individual cookies
        const cookiesArray = document.cookie.split(";");

        // Initialize variable to store cookie value
        let cookieValue;

        // Loop through each cookie to find the matching name
        cookiesArray.forEach(cookie => {
            const [name, value] = cookie.trim().split("=");
            if (name === cookieName) {
                cookieValue = value;
            }
        });

        // If cookie value is found, decode it and return
        if (cookieValue) {
            return decodeURIComponent(cookieValue);
        } else {
            return ""; // Return null if cookie not found
        }
    }

    static getCookieValue(cookieName: string): string {

        // Check if the document object is defined
        if (typeof document === 'undefined') {
            return ""; // Return empty string if document is undefined
        }

        // Define the cookies string
        const cookies = document.cookie;

        // Split the cookies string into individual cookies
        const cookieArray = cookies.split("; ");

        // Initialize variable to store cookie value
        let cookieValue;

        // Loop through each cookie to find the matching name
        cookieArray.forEach(cookie => {
            const [key, value] = cookie.split("=");
            if (key === cookieName) {
                cookieValue = value;
            }
        });

        // Return the cookie value or empty string if not found
        return cookieValue || "";
    }

    // static header(header: Headers): Headers {

    //     const token = cookies().get("token")?.value
    //     const new = new Headers()
    //     if (!token) {
    //         return
    //     }

    //     return new Headers()
    // }
}