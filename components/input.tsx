import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// interface InputProps {
//     className?: string;
//     id?: string;
//     type?: string;
//     disabled: boolean;
//     placeholder?: string;
//     accept?: string;
// }

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    type = "text", disabled,
    ...props
}, ref) => {
    return (
        <input
            ref={ref}
            {...props}
            className={twMerge(" flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none", className)}
            type={type}
        />
    )
})

Input.displayName = 'Input';

export { Input }