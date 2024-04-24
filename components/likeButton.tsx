"use client"

import { useAuthModal } from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

function LikeButton({ songId }: { songId: string }) {
    const router = useRouter()
    const { supabaseClient } = useSessionContext()

    const authModal = useAuthModal()
    const { user } = useUser()

    const [isLiked, setIsLiked] = useState(false)

    //NOTE - running an async function inside useEffect
    useEffect(() => {
        //if user is not logged in, we do not need to show him liked songs
        if (!user?.id) {
            return;
        }
        // if logged in , show him is liked songs
        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .single()

            if (!error && data) {
                setIsLiked(true)
            }

        }
        fetchData()
    }, [user?.id, songId, supabaseClient])

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart

    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen()
        }

        if (isLiked) {
            const { error } = await supabaseClient
                .from('liked_songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id', songId)

            if (error) {
                console.log(error)
                toast.error("somthing went wrong")
            } else {
                setIsLiked(false)
                toast("❎ Removed from liked 💚 songs")
            }
        } else {
            const { error } = await supabaseClient
                .from("liked_songs")
                .insert({
                    song_id: songId,
                    user_id: user.id
                });

            if (error) {
                toast.error("somthing went wrong")
            } else {
                setIsLiked(true);
                toast.success("Added to liked 💚 songs ")
            }
        }
        router.refresh()
    }

    return (
        <button
            onClick={handleLike}
            className=" hover:opacity-75 hover:scale-95 transition">
            <Icon
                color={isLiked ? "#22c55e" : "white"}
                size={25}
            />
        </button>
    )
}

export default LikeButton