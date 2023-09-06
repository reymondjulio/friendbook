import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";

export default function ButtonLink({ children, ...props }: LinkProps) {
  return (
    <Link className="w-full block bg-blue-500 hover:bg-blue-400 py-2 rounded text-white text-sm font-bold text-center" {...props}>
      {children}
    </Link>
  );
}
