// https://remix.run/docs/en/main/tutorials/blog#loading-data

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import dataFriends from "~/data/friends.json";
import { ChatBubbleLeftRightIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Button from "~/components/ui/button";

export const loader = async ({ params }: LoaderArgs) => {
  const friend = dataFriends.find((friend) => {
    return friend.username === params.username;
  });

  return json({ friend });
};

export default function Route() {
  const { friend } = useLoaderData<typeof loader>();

  if (!friend) {
    return (
      <div>
        <h1>Sorry, friend not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl h-screen flex flex-col items-start ">
      <img className="w-full h-96 bg-cover object-cover rounded-md mb-4" src={friend.coverURL} alt={friend.name} />

      <div className="container mx-auto max-w-4xl flex p-4 py-6 items-start bg-white">
        <img className="w-32 h-32 rounded-full bg-cover" src={friend.avatarURL} alt={friend.name} />
        <div className="px-4 space-y-2 mr-auto">
          <h3 className="text-3xl font-bold text-black">{friend.name}</h3>
          <p className="pl-1 text-gray-500 font-bold">{friend.mutualFriends.length} Mutual Friends</p>
          <ul className="flex gap-x-1">
            {friend.mutualFriends.map((mutualFriend) => {
              return (
                <li key={mutualFriend.id}>
                  <img className="w-8 h-8 rounded-full" src={mutualFriend.avatarURL} alt={mutualFriend.name} width={10} height={10} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-x-2 h-8 self-center">
          <Button variant="secondary">
            <UserPlusIcon className="w-4 h-4 " /> Friend
          </Button>
          <Button variant="primary">
            {" "}
            <ChatBubbleLeftRightIcon className="w-4 h-4" /> Message
          </Button>
        </div>
      </div>
    </div>
  );
}
