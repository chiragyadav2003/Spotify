import { Price } from "@/types";
import axios from 'axios'
import { headers } from "next/headers";

//get url to check if we are on localhost, vercel deployed etc.
export const getURL = () => {
    let url =
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        'http://localhost:3000/';

    url = url.includes('http') ? url : `https://${url}`;
    url = url.charAt(url.length - 1) === '/' ? url : `${url}`;

    return url;
}

export const postData = async (
    { url, data }: { url: string, data: { price: Price } }
) => {
    console.log("post request", url, data)
    try {
        const res = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true // equivalent to credentials: 'same-origin'
        })
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log("error posting data")
    }
}

export const toDateTime = (secs: number) => {
    var t = new Date('1970-01-01T00:30:00Z');
    t.setSeconds(secs);
    return t;
}