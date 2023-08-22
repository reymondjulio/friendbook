import { UserPlusIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Button from "~/components/ui/button";
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
  if (!user) {
    return (
      <div>
        <h1>Sorry, user not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl h-screen flex flex-col items-start ">
      {user.coverURL && <img className="w-full h-96 bg-cover object-cover rounded-md mb-4" src={user.coverURL} alt={user.name} />}

      <div className="container mx-auto max-w-4xl flex p-4 py-6 items-start bg-white">
        {user.avatarURL && <img className="w-32 h-32 rounded-full bg-cover" src={user.avatarURL} alt={user.name} />}
        <div className="px-4 space-y-2 mr-auto">
          <h3 className="text-3xl font-bold text-black">{user.name}</h3>
        </div>
        <div className="flex gap-x-2 h-8 self-center">
          <Button variant="secondary">
            <UserPlusIcon className="w-4 h-4 " /> Friend
          </Button>
          <Button variant="primary">
            <ChatBubbleLeftRightIcon className="w-4 h-4" /> Message
          </Button>
        </div>
      </div>
    </div>
  );
}
