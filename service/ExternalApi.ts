
export default class ExternalApi {

    static async fetch(endpoint: string, method = "GET", data: any) {

        try {
            const url = `http://localhost:5001/${endpoint}`;

            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };

            const options: RequestInit = {
                method,
                headers,
                body: data ? JSON.stringify(data) : null,
            };

            console.log(endpoint)
            
            const response = await fetch(url, options);
            // const response = await fetch(axiosConfig)
           
            // const result = await response.data()
            // const referer = response.headers;
            // console.log(result)

            // console.log(referer)
            console.log(response)
            // if (!response.ok) {
            //     return Promise.reject(result)
            // }

            // if (result && result.success === false) {
            //     return Promise.reject(result)
            // }

            // return result;

        } catch (error) {

            return error;
        }
    }

}