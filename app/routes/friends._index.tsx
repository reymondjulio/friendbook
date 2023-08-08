// https://remix.run/docs/en/main/tutorials/blog#loading-data

import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import dataFriends from "~/data/friends.json";
import Button from "~/components/ui/button";

export const loader = async () => {
  return json({ friends: dataFriends });
};

export default function Route() {
  const { friends } = useLoaderData<typeof loader>();

  return (
    <div>
      <ul className="max-w-6xl mx-auto grid grid-cols-2 justify-center items-center md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 py-4">
        {friends.map((friend) => {
          return (
            <Link className="block hover:opacity-80 justify-self-center self-center" key={friend.id} to={`/friends/${friend.username}`}>
              <li className="max-w-fit h-fit rounded bg-white" key={friend.id}>
                <div>
                  <img className="w-60 h-60 rounded object-cover overflow-hidden" src={friend.avatarURL} alt={friend.name} />
                </div>
                <div className="p-2 text-center">
                  <h2 className="text-lg font-semibold">{friend.name}</h2>
                  <p className="text-slate-80">{friend.age} years old</p>
                  <p className="text-gray-500">{friend.mutualFriends.length} mutual friends</p>
                </div>
                <div className="flex flex-col p-2 gap-y-2">
                  <Button variant="primary">Confirm</Button>
                  <Button variant="secondary">Delete</Button>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
