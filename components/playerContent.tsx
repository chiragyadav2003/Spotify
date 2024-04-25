"use client"

import { Song } from "@/types"
import MediaItem from "./mediaItem";
import LikeButton from "./likeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillForward, AiFillStepBackward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import Slider from "./slider";
import usePlayer from "@/hooks/usePlayer";
import { useState, useEffect, use, useRef } from "react";
import { Howl, Howler } from "howler";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

function PlayerContent({ song, songUrl }: PlayerContentProps) {

    const soundRef = useRef<Howl | null>(null)
    const player = usePlayer()
    const [volume, setVolume] = useState(0.5)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0); // Progress in seconds

    //if playing, show pause and if pause show playing
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    //play next song
    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const nextSongIndex = player.ids[currentIndex + 1]
        //if no next song, reset to start song 
        if (!nextSongIndex) {
            return player.setId(player.ids[0])
        }
        return player.setId(nextSongIndex);
    }

    //play previous song
    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const prevSongIndex = player.ids[currentIndex - 1]
        //if no prev song, reset to last song 
        if (!prevSongIndex) {
            return player.setId(player.ids[player.ids.length - 1])
        }
        return player.setId(prevSongIndex);
    }

    //NOTE - HOWL to manage song - play,pause,end 
    useEffect(() => {
        soundRef.current = new Howl({
            src: [songUrl],
            autoplay: true,
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext()
            },
            onpause: () => setIsPlaying(false),
            format: ["mp3"]
        });

        return () => {
            if (soundRef.current) {
                soundRef.current.unload();
            }
        };
    }, [songUrl])

    useEffect(() => {
        const updateProgress = () => {
            const seek = soundRef.current?.seek() || 0;
            setProgress(seek);
            requestAnimationFrame(updateProgress)
        };
        if (isPlaying) {
            requestAnimationFrame(updateProgress);
        }
    }, [isPlaying])

    const handleVolumeChange = (value: number) => {
        setVolume(value);
        soundRef.current?.volume(value);
    }

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseInt(e.target.value, 10)
        setProgress(newProgress)
        soundRef.current?.seek(newProgress)
    }

    const handlePlay = () => {
        if (!isPlaying) {
            soundRef.current?.play()
        } else {
            soundRef.current?.pause()
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
            soundRef.current?.volume(1);
        } else {
            setVolume(0);
            soundRef.current?.volume(0);
        }
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            {/* -----mobile view----- */}
            <div className=" flex md:hidden col-auto w-full justify-end items-center">
                <div
                    onClick={handlePlay}
                    className=" size-10 flex items-center justify-center rounded-full p-1 cursor-pointer bg-white"
                >
                    <Icon size={30} className=" text-black" />
                </div>
            </div>

            {/* -----desktop view----- */}
            <div className="hidden md:flex md:flex-col">

                <div className="flex justify-center items-center pt-2 gap-x-4">
                    <div className="text-white w-10 flex-shrink-0">
                        {new Date(progress * 1000).toISOString().substring(14, 19)}
                    </div>
                    <input
                        className=" accent-green-300 w-[70%] max-w-[300px]  "
                        type="range"
                        min={0}
                        max={soundRef.current?.duration() || 0}
                        value={progress}
                        onChange={(e) => handleProgressChange(e)}
                    />
                    <div className="text-white w-10 flex-shrink-0">
                        {soundRef.current?.duration()
                            ? new Date(soundRef.current?.duration() * 1000)
                                .toISOString()
                                .substring(14, 19)
                            : "??:??"
                        }
                    </div>
                </div>

                <div className="hidden md:flex h-full w-full justify-center items-center max-w-[722px] gap-x-6 ">
                    <AiFillStepBackward
                        size={30}
                        onClick={onPlayPrevious}
                        className=" text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                    <div
                        onClick={handlePlay}
                        className=" flex items-center justify-center size-10 rounded-full bg-white p-1 cursor-pointer "
                    >
                        <Icon
                            size={30}
                            className=" text-black"
                        />
                    </div>
                    <AiFillForward
                        size={30}
                        onClick={onPlayNext}
                        className=" text-neutral-400 cursor-pointer hover:text-white transition"
                    />
                </div>
            </div>

            {/* --- volume info, visible in desktop --- */}
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[150px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className=" cursor-pointer"
                        size={34}
                    />
                    {Math.floor(volume * 100)}
                    <Slider
                        value={volume}
                        onChange={(value) => handleVolumeChange(value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default PlayerContent