"use client"

import toast from "react-hot-toast"
import { Button } from "@/components/button"
import { Box } from "@/components/box"
import { useEffect } from "react"
import Link from "next/link"


function Error() {
    useEffect(() => {
        // Create a toast and store its reference
        const toastId = toast.error("Something went wrong");

        // Cleanup function to dismiss the toast when the component unmounts
        return () => toast.dismiss(toastId);
    }, [])
    return (
        <Box className="h-full w-full flex flex-col items-center justify-center">
            <div className=" text-3xl font-semibold text-rose-400 animate-bounce shadow-md shadow-red-700 px-6 py-3 rounded-md hover:z-20 flex items-center gap-x-4">Something went wrong <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 animate-bounce">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            </div>
            <Link href={"/"}>
                <Button
                    className=" text-xl font-bold border-2 bg-neutral-800 text-white px-4 py-2 rounded-xl my-16 hover:shadow-md hover:shadow-orange-400"
                >Home Page</Button>
            </Link>
        </Box>
    )
}

export default Error




