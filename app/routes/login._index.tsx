import { Form } from "@remix-run/react";
import Label from "~/components/ui/label";
import Input from "~/components/ui/input";
import Button from "~/components/ui/button";
import ButtonLink from "~/components/ui/button-link";
import type { ActionArgs } from "@remix-run/node";

export default function Login() {
  return (
    <div className="container mx-auto w-full max-w-6xl h-screen p-4 gap-x-6 gap-y-6 flex flex-wrap justify-center lg:justify-between items-start lg:items-center">
      <div className="max-w-lg w-full space-y-4 text-center lg:text-left self-center  lg:mb-44">
        <h1 className="text-4xl sm:text-6xl text-blue-500 font-bold">Friendbook</h1>
        <p className="text-2xl sm:text-3xl font-semibold">Connect with friends and the world around you on Friendbook.</p>
      </div>

      <div className="max-w-sm w-full ring-0 shadow-md lg:mb-24">
        <div className="bg-white">
          <Form method="POST" className="flex flex-col gap-y-4 px-12 pt-10 mb-4">
            <div>
              <Label htmlFor="email" />
              <Input id="email" name="email" type="text" autoComplete="email" required placeholder="Email address" />
            </div>
            <div>
              <Label htmlFor="password" />
              <Input id="password" name="password" type="text" autoComplete="password" required placeholder="Password" />
            </div>

            <Button variant="secondary" type="submit">
              Log in
            </Button>
          </Form>

          <div className="flex px-12 pb-8">
            <ButtonLink to="/signup">Create New Account</ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  console.log({ email, password });

  return null;
}
