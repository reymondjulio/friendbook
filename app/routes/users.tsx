import { json, type LoaderArgs } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";

import { prisma } from "~/db.server";

export const meta: V2_MetaFunction = () => [{ title: "All users" }];

export const loader = async ({ request }: LoaderArgs) => {
  const users = await prisma.user.findMany();

  return json({ users });
};

export default function RouteComponent() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto max-w-6xl px-6 py-4 min-h-screen">
      <ul className="grid grid-cols-4 gap-x-6 gap-y-6">
        {users.map((user) => {
          return (
            <li key={user.id} className="max-w-fit h-fit">
              <Link to="/username">{user.avatarURL && <img className="w-60 h-60 rounded-t-lg object-cover overflow-hidden bg-white hover:opacity-80" src={user.avatarURL} alt={user.name} />}</Link>
              <div className=" bg-white p-4 space-y-2">
                <p className="text-center font-semibold">{user.name}</p>
                <p className="text-center font-light">@{user.username}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
