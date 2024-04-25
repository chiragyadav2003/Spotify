"use client"

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useUploadModal } from "@/hooks/useUploadModal ";
import { Song } from "@/types";
import MediaItem from "./mediaItem";
import useOnPlay from "@/hooks/useOnPlay";


export function Library({ songs }: { songs: Song[] }) {

    const authModal = useAuthModal()
    const { user } = useUser()
    const uploadModal = useUploadModal()

    //declare onPlay function which is returned by useOnPlay hook which will play a song, pass array of songs tp useOnPlay whch will set playlist itself
    const onPlay = useOnPlay(songs);

    const onClick = () => {
        // user can only add favourites only if he is logged in , if not then show login modal
        if (!user) {
            return authModal.onOpen()
        }

        //TODO - check for subscription

        // if all good, then open modal/dialog for adding song to favourite
        return uploadModal.onOpen()
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className=" inline-flex items-center gap-x-2">
                    <TbPlaylist className=" text-neutral-400" size={26} />
                    <p
                        className=" text-neutral-400 font-medium"
                    >
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className=" text-neutral-400 cursor-pointer hover:text-white transition"
                />
            </div>
            <div
                className="flex flex-col gap-y-2 mt-4 px-3"
            >
                {songs.map((song) => (
                    <MediaItem
                        onClick={(id: string) => onPlay(id)}
                        key={song.id}
                        data={song}
                    />
                ))}
            </div>
        </div>
    )
}