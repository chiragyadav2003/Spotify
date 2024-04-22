"use client"

import { useState } from "react"
import { Database } from "@/types_db"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { SessionContextProvider } from "@supabase/auth-helpers-react"

const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
    const [supabasClient] = useState(() =>
        createClientComponentClient<Database>()
    );

    return (
        <SessionContextProvider supabaseClient={supabasClient}>
            {children}
        </SessionContextProvider>
    )
}

export default SupabaseProvider;