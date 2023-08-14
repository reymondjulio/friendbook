import { Link } from "@remix-run/react";

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function ButtonLink({ children, ...props }: AnchorProps) {
  <Link to={""} className="w-full block bg-green-500 hover:bg-green-400 py-2 rounded text-white text-sm font-bold text-center" {...props}>
    {children}
  </Link>;
}
