import { Link } from "@remix-run/react";
import Button from "~/components/ui/button";
export default function SignUp() {
  return (
    <div className="w-full min-h-screen flex justify-center p-6">
      <div className="container mx-auto w-full h-fit max-w-md bg-white shadow-md border rounded-lg">
        <h2 className="mt-2 text-center text-2xl sm:text-3xl font-semibold text-gray-700">Create a new account</h2>
        <form className="mt-2 space-y-4 p-4">
          <div className="rounded-md shadow-sm space-y-4">
            <div className="flex gap-x-2">
              <div className="space-y-1 basis-1/2">
                <label htmlFor="firstname">First name:</label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  className="rounded-lg w-full relative block px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First name"
                />
              </div>
              <div className="space-y-1 basis-1/2">
                <label htmlFor="lastname">Last name:</label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  className="rounded-lg relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email-address">Email:</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-lg relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="rounded-lg relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="birthday">Birth date:</label>
              <input
                id="birthday"
                name="birthday"
                type="date"
                required
                className="rounded-lg relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Birthday"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                required
                className="rounded-lg relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <Button type="submit">Sign Up</Button>
          </div>
          <div>
            <Link to="/login" className="block bg-green-500 hover:bg-green-400 py-2 rounded text-white text-sm font-bold w-full text-center">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
