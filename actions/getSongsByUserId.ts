"use server";

import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByUserId = async (): Promise<Song[]> => {

    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const {
        data: sessionData,
        error: sessionError
    } = await supabase.auth.getSession()

    if (sessionError) {
        console.log(sessionError.message)
        return []
    }

    //return songs in which current session user_id is equals to "user_id" which is stored in songs table
    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', { ascending: false })

    return (data as any) || [];
}

export default getSongsByUserId;