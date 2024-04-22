import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser()
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
    const [subscription, setSubscription] = useState<Subscription | null>(null)

    // The asterisk (*) is a wildcard that means "select all columns".
    // .single(): The single() method modifies the query such that it expects to return only a single row from the database. If the query matches more than one row, it typically returns an error, and if it matches no rows, it returns null.
    const getUserDetails = () => supabase.from('users').select('*').single();

    // prices(*, products(*)) suggests a relational join operation:
    const getSubscription = () => supabase.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trailing', 'active']).single()

    //NOTE - using Promis.allSettled([...]) to resolve multiple promise request and resolve them
    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true)

            Promise.allSettled([getUserDetails(), getSubscription()])
                .then((results) => {
                    const userDetailsPromise = results[0] //1'st item in array
                    const subscriptionPromise = results[1] //2'nd item in array

                    if (userDetailsPromise.status === 'fulfilled') {
                        setUserDetails(userDetailsPromise.value.data as UserDetails)
                    }

                    if (subscriptionPromise.status === 'fulfilled') {
                        setSubscription(subscriptionPromise.value.data as Subscription)
                    }


                    setIsLoadingData(false)

                })
        } else if (!user && !isLoadingData && !isLoadingUser) {
            setUserDetails(null)
            setSubscription(null)
        }
    }, [user, isLoadingUser])

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    };

    return <UserContext.Provider value={value} {...props} />

}

export const useUser = () => {
    const context = useContext(UserContext)

    if (context === undefined) {
        throw new Error('useUser must be used within a MyUserContetProvider')
    }

    return context;
}