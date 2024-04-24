import getLikedSongs from "@/actions/getLikedSongs";
import { Header } from "@/components/header";
import Image from "next/image";
import LikedContent from "./_component/LikedContent";

export const revalidate = 0;

async function LikedPage() {

    const likedSongs = await getLikedSongs()

    return (
        <div
            className=" bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
        >
            <Header>
                <div
                    className="flex flex-col md:flex-row items-center gap-x-5"
                >
                    <div
                        className=" relative size-32 lg:size-44"
                    >
                        <Image
                            className=" object-cover"
                            alt="playlist"
                            fill
                            src={"/images/liked.jpeg"}
                        />
                    </div>
                    <div
                        className=" flex flex-col gap-y-2 mt-4 md:mt-0"
                    >
                        <p className="hidden md:block font-semibold text-sm">
                            Playlist
                        </p>
                        <h1
                            className=" text-white text-4xl sm:text-5xl lg:text-7xl font-bold"
                        >
                            Liked Songs
                        </h1>
                    </div>
                </div>
            </Header>
            <LikedContent songs={likedSongs} />
        </div>
    )
}

export default LikedPage