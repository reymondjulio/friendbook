import { Link } from "@remix-run/react";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
export default function SignUp() {
  return (
    <div className="w-full min-h-screen flex justify-center p-6">
      <div className="container mx-auto w-full h-fit max-w-md bg-white shadow-md border rounded-lg">
        <h2 className="mt-2 text-center text-2xl sm:text-3xl font-semibold text-gray-700">Create a new account</h2>
        <form className="mt-2 space-y-4 p-4">
          <div className="rounded-md shadow-sm space-y-4">
            <div className="flex gap-x-2">
              <div className="space-y-1 basis-1/2">
                <Label htmlFor="firstname">First name:</Label>
                <Input id="firstname" name="firstname" type="text" placeholder="First name" required></Input>
              </div>
              <div className="space-y-1 basis-1/2">
                <Label htmlFor="lastname">Last name:</Label>
                <Input id="lastname" name="lastname" type="text" placeholder="Last name" required></Input>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email:</Label>
              <Input id="email" name="email" type="email" autoComplete="email" placeholder="Email" required></Input>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password:</Label>
              <Input id="password" name="password" type="password" autoComplete="password" placeholder="Password" required></Input>
            </div>

            <div className="space-y-1">
              <Label htmlFor="birthday">Birthday:</Label>
              <Input id="birthday" name="birthday" type="date" placeholder="Birthday" required></Input>
            </div>

            <div className="space-y-1">
              <Label htmlFor="gender">Gender:</Label>
              <select id="gender" name="gender" required className="rounded-lg relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-indigo-200 focus:z-10 sm:text-sm md:text-md" defaultValue="">
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
