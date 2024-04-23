"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi"
import { Box } from "./box";
import { SidebarItem } from "./sidebarItem";
import { Library } from "./library";
import { Song } from "@/types";


export function Sidebar(
    { children, songs }: { children: React.ReactNode, songs: Song[] }) {

    const pathname = usePathname()

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: "Home",
            active: pathname !== "/search",
            href: "/"
        },
        {
            icon: BiSearch,
            label: "Search",
            active: pathname === "/search",
            href: "/search"
        }
    ], [pathname])

    return (
        <div className="flex h-full">
            {/* sidebar will be initially hidden for mobile apps */}
            <div className=" hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {
                            routes.map((item) => (
                                <SidebarItem
                                    key={item.label}
                                    {...item}
                                />
                            ))
                        }
                    </div>
                </Box>
                <Box className=" overflow-y-auto h-full">
                    <Library songs={songs} />
                </Box>
            </div>
            {/*  'flex-1' class sets the flex-grow property to 1, allowing the flex item to grow to fill the available space */}
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
}