import { Link } from "@remix-run/react";
import Label from "~/components/ui/label";
import Input from "~/components/ui/input";

export default function Login() {
  return (
    <div className="container mx-auto w-full max-w-6xl p-4 gap-x-6 gap-y-12 flex flex-wrap justify-center lg:justify-between lg:items-center min-h-screen">
      <div className="max-w-lg w-full space-y-4 text-center lg:text-left self-center lg:mb-44">
        <h1 className="text-4xl lg:text-6xl text-blue-500 font-bold">Friendbook</h1>
        <p className="text-2xl lg:text-3xl font-semibold">Connect with friends and the world around you on Friendbook.</p>
      </div>

      <div className="max-w-sm w-full ring-0 mb-24">
        <form className="flex flex-col gap-y-4 bg-white p-6" action="">
          <div className="w-full">
            <Label htmlFor="email" />
            <Input id="email" name="email" type="text" autoComplete="email" required placeholder="Email or Phone Number" />
          </div>
          <div>
            <Label htmlFor="password" />
            <Input id="password" name="password" type="text" autoComplete="password" required placeholder="Password" />
          </div>

          <Link className="bg-blue-400 hover:bg-blue-300 text-white py-2 rounded font-bold text-center">Log in</Link>
          <p className="text-center text-blue-500">Forgot password?</p>

          <Link to="/register" className="bg-green-500 hover:bg-green-400 py-2 rounded text-white text-sm font-bold w-full text-center self-center">
            Create New Account
          </Link>
        </form>
      </div>
    </div>
  );
}
