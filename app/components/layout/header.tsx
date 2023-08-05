import { Link } from "@remix-run/react";

const navItems = [
  { to: "/", text: "Home" },
  { to: "/friends", text: "Friends" },
];

export default function Header() {
  return (
    <header className="w-full bg-blue-500 sticky top-0 z-10">
      <nav className="container mx-auto flex max-w-6xl py-2 px-4 md:justify-between md:items-center">
        <h1 className="text-3xl text-white font-bold mr-4">Friendbook</h1>

        <ul className="flex gap-x-4">
          {navItems.map((navItem) => {
            return (
              <li key={navItem.to}>
                <Link className="text-white font-semibold " to={navItem.to}>
                  {navItem.text}
                </Link>
              </li>
            );
          })}
        </ul>

        <div>
          <input className="bg-slate-100 rounded-xl focus:outline-none py-1 px-4 text-sm text-center" type="text" placeholder="Search Friends..." />
        </div>
      </nav>
    </header>
  );
}
