"use server";

import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession()

    const { data, error } = await supabase
        .from('liked_songs')
        .select('*, songs(*)')
        .eq('user_id', session?.user?.id)
        .order("created_at", { ascending: false })

    if (error) {
        console.log(error)
        return [];
    }

    if (!data) {
        return [];
    }

    // console.log(data)
    return data.map((item) => ({
        ...item.songs
    }))


}

export default getLikedSongs;

/*
 ------ we are getting this type of data ------
 ------ fromthis we will parse onlu songs ------
user_id: '79a302a7-30a1-4741-98fb-928519e92b0d',
    created_at: '2024-04-24T10:50:21.593087+00:00',
    song_id: 8,
    songs: {
      id: 8,
      title: 'Batman vs Superman',
      author: 'DC comics',
      user_id: '79a302a7-30a1-4741-98fb-928519e92b0d',
      song_path: 'song-Batman vs Superman-lvctocau',
      created_at: '2024-04-23T20:12:27.592745+00:00',
      image_path: 'image-Batman vs Superman-lvctocau'
    }

*/