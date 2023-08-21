// https://remix.run/docs/en/main/tutorials/blog#loading-data

import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import dataFriends from "~/data/friends.json";
import Button from "~/components/ui/button";

export const loader = async () => {
  return json({ friends: dataFriends });
};

export default function Route() {
  const { friends } = useLoaderData<typeof loader>();

  return (
    <div>
      <ul className="max-w-6xl mx-auto grid grid-cols-2 justify-center items-center md:grid-cols-3 lg:grid-cols-4 gap-y-4 px-2 py-4">
        {friends.map((friend) => {
          return (
            <li className="max-w-fit h-fit rounded bg-white justify-self-center self-center" key={friend.id}>
              <div>
                <Link className="block hover:opacity-80" key={friend.id} to={`/friends/${friend.username}`}>
                  <img className="w-60 h-60 rounded object-cover overflow-hidden" src={friend.avatarURL} alt={friend.name} />
                </Link>
              </div>
              <div className="p-2 text-center">
                <h2 className="text-lg font-semibold">{friend.name}</h2>
                <p className="text-slate-80">{friend.age} years old</p>
                <p className="text-gray-500">{friend.mutualFriends.length} mutual friends</p>
              </div>
              <div className="flex flex-col p-2 gap-y-2">
                <Form method="PUT">
                  <Button variant="primary">Confirm</Button>
                </Form>
                <Form method="PUT">
                  <Button variant="secondary">Delete</Button>
                </Form>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
