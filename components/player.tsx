"use client"

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer"
import PlayerContent from "./playerContent";

function Player() {
    const player = usePlayer();

    const { song } = useGetSongById(player.activeId)

    const songUrl = useLoadSongUrl(song!)

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div
            className=" fixed bottom-0 bg-black w-full py-2 h-[120px] px-4 "
        >
            {/* // assign key so that the component reset use-sound hook when the song changes (cus use-sound and HOWL doesn't support dynamic url changes => we can observe this in "likedSong" functionality, if we do not use key then if one liked song is played then all song will be displayed liked while playing) */}
            <PlayerContent
                key={songUrl}
                song={song}
                songUrl={songUrl}
            />
        </div>
    )
}

export default Player