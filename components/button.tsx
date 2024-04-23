import { twMerge } from "tailwind-merge";

// interface ButtonProps {
//     children: React.ReactNode;
//     className?: string;
//     onClick?: () => void;
//     disabled?: boolean;
//     type?: string;
// }

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

export function Button({
    children,
    className,
    type = "button",// Defaulting to 'button' to avoid unintentional submits
    ...props // Spread remaining props to handle onClick, disabled, etc.
}: ButtonProps) {
    return (
        <button
            type={type}
            className={twMerge("w-full rounded-full bg-green-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition", className)}
            {...props}
        >
            {children}
        </button>
    )
}