"use client"
import { useState } from "react";

type data = {

    token?: string;
    sessiom?: string

}

export default function ClientTodo() {


    const [responseData, setResponse] = useState<data | null>(null)


    const trigger = async () => {

        console.log("client side response")
        try {
            const response = await fetch('http://localhost:3000/api/handshake', {
                method: "GET",
                cache: 'no-store',
            });
            return response.json();
        }
        catch (error) {

        }

    }




    return (

        <div className="w-[400px] m-6 h-[200px]">

            <button onClick={trigger}>Fetch Keys</button>
            <label>{responseData && responseData?.token}</label>
            <label>{responseData && responseData?.sessiom}</label>

        </div >

    );
}
