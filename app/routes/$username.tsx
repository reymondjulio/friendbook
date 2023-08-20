import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: { posts: true },
  });
  return json({ user });
};

export default function RouteComponent() {
  const { user } = useLoaderData<typeof loader>();
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
