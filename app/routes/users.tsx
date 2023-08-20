import { json, type LoaderArgs } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

import { prisma } from "~/db.server";

export const meta: V2_MetaFunction = () => [{ title: "All users" }];

export const loader = async ({ request }: LoaderArgs) => {
  const users = await prisma.user.findMany();

  return json({ users });
};

export default function RouteComponent() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto max-w-6xl p-6 h-screen">
      <ul className="grid grid-cols-3">
        {users.map((user) => {
          return (
            <li key={user.id} className="max-w-fit h-fit bg-white">
              {user.avatarURL && <img className="w-60 h-60 rounded object-cover overflow-hidden" src={user.avatarURL} alt={user.name} />}
              <p className="text-center font-semibold p-4">{user.name}</p>
              <p className="text-center font-light">@{user.username}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
