"use client"

import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { RxCaretLeft } from "react-icons/rx"
import { RxCaretRight } from "react-icons/rx"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import { Button } from "./button"



export function Header({ children, className }:
    { children: React.ReactNode, className?: string }) {

    const router = useRouter()

    const handleLogout = () => {
        // logout user
    }

    return (
        <div
            className={twMerge(" h-fit bg-gradient-to-b from-emerald-800 p-6", className)}
        >
            <div className="w-full mb-4 flex items-center justify-between">
                {/* provide functionality for previous and next song, hiddenon mobile view */}
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        onClick={() => router.back()}
                        className=" rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    >
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className=" rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
                    >
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>
                {/* home and search will be visible on mobile screen only */}
                <div className="flex md:hidden gap-x-2 items-center">
                    <button
                        className=" rounded-full bg-white flex p-2 items-center justify-center hover:opacity-75 transition"
                    >
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button
                        className=" rounded-full bg-white flex p-2 items-center justify-center hover:opacity-75 transition"
                    >
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    <>
                        <div>
                            <Button
                                onClick={() => { }}
                                className=" bg-transparent text-neutral-300 font-medium"
                            >
                                Sign up
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={() => { }}
                                className=" bg-white px-6 py-2"
                            >
                                Log in
                            </Button>
                        </div>
                    </>
                </div>
            </div>
            {children}
        </div>
    )
}