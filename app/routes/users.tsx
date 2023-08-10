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
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
