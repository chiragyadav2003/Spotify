"use client"

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
    onClick?: (id: string) => void;
    data: Song
}

function MediaItem({ onClick, data }: MediaItemProps) {
    const imageUrl = useLoadImage(data);
    const handleCLick = () => {
        if (onClick) {
            return onClick(data.id)
        }
        //TODO = default turn on player
    }
    return (
        <div
            className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2"
        >
            <div
                className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden "
            >
                <Image
                    alt="song-image"
                    src={imageUrl || "/images/liked.png"}
                    fill
                    className=" object-cover"
                />
            </div>
            <div
                className="flex flex-col gap-y-1 overflow-hidden"
            >
                <p className=" text-white truncate">
                    {data.title}
                </p>
                <p className=" text-neutral-400 text-sm truncate">
                    {data.author}
                </p>
            </div>
        </div>
    )
}

export default MediaItem