import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function useLoadSongUrl(song: Song) {
    // NOTE - we do not use authentication here, so we use this
    const supabaseClient = useSupabaseClient()

    if (!song) {
        return '';
    }

    const { data: songData } = supabaseClient
        .storage
        .from('songs')
        .getPublicUrl(song.song_path)

    return songData.publicUrl;
}

export default useLoadSongUrl