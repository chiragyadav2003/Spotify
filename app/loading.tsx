"use client"

import { Box } from "@/components/box"
import { BounceLoader } from "react-spinners"

function Loading() {
    return (
        <Box
            className="h-full w-full flex items-center justify-center bg-neutral-400"
        >
            <BounceLoader color="#22c55e" size={40} />
        </Box>
    )
}

export default Loading;