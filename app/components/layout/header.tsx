import { Link } from "@remix-run/react";

const navItems = [
  { to: "/", text: "Home" },
  { to: "/friends", text: "Friends" },
  { to: "/users", text: "Users" },
  { to: "/signup", text: "SignUp" },
  { to: "/login", text: "Login" },
];

export default function Header() {
  return (
    <header className="w-full bg-blue-500 sticky top-0 z-10">
      <nav className="container mx-auto flex flex-wrap max-w-6xl py-4 md:py-2 sm:px-14 md:px-12 lg:px-8 justify-center md:justify-between gap-y-4 gap-x-4 items-center">
        <h1 className="text-3xl text-white font-bold lg:pl-2 md:mr-4">Friendbook</h1>

        <ul className="flex gap-x-4 md:gap-x-8 lg:gap-x-16">
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
          <form action="">
            <label className="hidden" htmlFor="search">
              search
            </label>
            <input className="bg-slate-100 rounded focus:outline-none py-1 px-4 text-sm text-center" type="search" placeholder="Search Friends..." />
          </form>
        </div>
      </nav>
    </header>
  );
}
