import { twMerge } from "tailwind-merge";


export function Button({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick: () => void }) {
    return (
        <button onClick={onClick} className={twMerge("w-full rounded-full bg-green-500 border border-transparent px-6 py-2 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition", className)}>
            {children}
        </button>
    )
}