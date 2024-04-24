"use client"

import LikeButton from "@/components/likeButton"
import MediaItem from "@/components/mediaItem"
import { Song } from "@/types"


function SearchContent({ songs }: { songs: Song[] }) {

    if (songs.length === 0) {
        return (
            <div
                className=" flex flex-col gap-y-2 w-full px-6 text-neutral-400"
            >
                No song found
            </div>
        )
    }

    return (
        <div className=" flex flex-col gap-y-2 w-full px-6 ">

            {
                songs.map((song) => (
                    <div
                        key={song.id}
                        className="flex items-center gap-x-4 w-full"
                    >
                        <div className=" flex-1">
                            <MediaItem
                                data={song}
                                onClick={() => { }}
                            />
                        </div>
                        <LikeButton songId={song.id} />
                    </div>
                ))
            }
        </div>
    )
}

export default SearchContent