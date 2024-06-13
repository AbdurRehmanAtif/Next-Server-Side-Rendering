import performNextRequest from "./http/NextApi";

export default class ProfileService {

    static async fetchProfileByToken<T>(token: string) {
        return await performNextRequest<T>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profile`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'authorization': "Bearer " + token
            },
        })
    }
    

}