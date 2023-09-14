import ButtonLink from "~/components/ui/button-link";
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
            <div className="space-y-1">
              <Label htmlFor="fullname">Full name:</Label>
              <Input id="fullname" name="fullname" type="text" placeholder="Full name" required></Input>
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
              <select
                id="gender"
                name="gender"
                required
                className="rounded-lg relative block w-full px-3 py-2 border border-slate-400 text-gray-700 placeholder-gray-400 focus:outline-blue-200 focus:z-10 sm:text-sm md:text-md"
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
            <ButtonLink to="/login">Login</ButtonLink>
          </div>
        </form>
      </div>
    </div>
  );
}
