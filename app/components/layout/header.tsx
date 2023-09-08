import { Link } from "@remix-run/react";
import { useRootLoaderData } from "~/hooks/use-root-loader-data";

const navItemsUnauthenticated = [
  { to: "/", text: "Home" },
  { to: "/users", text: "Users" },
  { to: "/signup", text: "Sign Up" },
  { to: "/login", text: "Log In" },
];

const navItemsAuthenticated = [
  { to: "/", text: "Home" },
  { to: "/users", text: "Users" },
  { to: "/logout", text: "Log Out" },
];

export default function Header() {
  const { userSession } = useRootLoaderData();

  const navItems = userSession?.id
    ? navItemsAuthenticated
    : navItemsUnauthenticated;

  return (
    <header className="w-full bg-blue-500 sticky top-0 z-10">
      <nav className="container flex flex-wrap max-w-6xl py-4 md:py-2 sm:px-14 md:px-12 lg:px-8 justify-center md:justify-normal gap-y-4 gap-x-4 items-center">
        <Link to="/">
          <h1 className="text-3xl text-white font-bold lg:pl-2 md:mr-4">
            Friendbook
          </h1>
        </Link>

        <div className="md:mr-12">
          <form action="">
            <label className="hidden" htmlFor="search">
              search
            </label>
            <input
              className="bg-slate-100 rounded-full focus:outline-none py-2 px-8 text-sm text-center items-stretch"
              type="search"
              placeholder="Search Friends"
            />
          </form>
        </div>

        <ul className="flex gap-x-4 md:gap-x-8 lg:gap-x-16">
          {navItems.map((navItem) => {
            return (
              <li key={navItem.to}>
                <Link
                  className="text-white font-semibold text-lg"
                  to={navItem.to}
                >
                  {navItem.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
