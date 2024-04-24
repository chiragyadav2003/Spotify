"use client"

import qs from 'query-string';
import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from './input';

function SearchInput() {

    const router = useRouter()
    const [value, setValue] = useState<string>("")
    const debouncedValue = useDebounce<string>(value)

    useEffect(() => {
        const query = {
            title: debouncedValue
        };
        //NOTE - create custom url as per our query for song 
        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        })

        //NOTE - pushing to that url
        router.push(url)
    }, [debouncedValue, router])



    return (
        <Input
            placeholder='🔍 Hey, what do you want to listen ?'
            onChange={(e) => setValue(e.target.value)}
        />
    )
}

export default SearchInput