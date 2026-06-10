import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className = "", ...props }: ButtonProps){
    return (
        <button className={`rounded-xl bg-(--primary) px-4 py-3 font-semibold text-white transition hover:bg-(--primary-hover) disabled:opacity-60 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}