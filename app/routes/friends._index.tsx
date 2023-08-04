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
      <ul>
        {friends.map((friend) => {
          return (
            <li key={friend.id}>
              <Link to={`/friends/${friend.username}`}>
                <h2>
                  {friend.name} (@{friend.username})
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
