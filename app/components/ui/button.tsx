interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
}

export default function Button({ variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={`py-2 px-4 flex items-center justify-center gap-x-2 rounded w-full self-center ${
        (variant === "primary" && `bg-blue-500 text-white text-sm sm:text-md hover:bg-blue-400`) || (variant === "secondary" && `bg-slate-300 text-black text-sm sm:text-md hover:bg-slate-200`)
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
