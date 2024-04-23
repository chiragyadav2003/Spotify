"use client"

import { Toaster } from "react-hot-toast"

const ToasterProvider = () => {
    return (
        <Toaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "#000",
                    color: "#fff"
                }
            }}
        />
    )
}

export default ToasterProvider;