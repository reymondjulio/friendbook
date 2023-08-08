// https://remix.run/docs/en/main/tutorials/blog#loading-data

import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import dataFriends from "~/data/friends.json";

export const loader = async () => {
  return json({ friends: dataFriends });
};

export default function Route() {
  const { friends } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Friends List</h1>
      <ul className="grid grid-cols-4">
        {friends.map((friend) => {
          return (
            <Link key={friend.id} to={`/friends/${friend.username}`}>
              <li className="flex flex-col" key={friend.id}>
                <div>
                  <img src={friend.avatarURL} alt={friend.name} width={10} height={10} />
                </div>
                <div>
                  <h2>
                    {friend.name} (@{friend.username})
                  </h2>
                  <p>{friend.age} years old</p>
                  <p>{friend.mutualFriends.length}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
