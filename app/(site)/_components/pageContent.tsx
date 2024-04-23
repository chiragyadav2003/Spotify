"use client"

import SongItem from "@/components/songItem"
import { Song } from "@/types"

function PageContent({ songs }: { songs: Song[] }) {
    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No songs availale
            </div>
        )
    }
    return (
        <div
            className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 mt-4"
        >
            {
                songs.map((song) => (
                    <SongItem
                        key={song.id}
                        onClick={() => { }}
                        data={song}
                    />
                ))
            }
        </div>
    )
}

export default PageContent