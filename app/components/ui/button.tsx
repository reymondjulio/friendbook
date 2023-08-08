export default function Button({ variant, children, ...props }) {
  return (
    <button
      className={`p-2 rounded w-full self-center ${(variant === "primary" && `bg-blue-500 text-white text-sm sm:text-md hover:bg-blue-400`) || (variant === "secondary" && `bg-slate-300 text-black text-sm sm:text-md hover:bg-slate-200`)}`}
      {...props}
    >
      {children}
    </button>
  );
}
