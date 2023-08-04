// https://remix.run/docs/en/main/tutorials/blog#loading-data

import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import dataFriends from "~/data/friends.json";

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
    <div>
      <h1>
        {friend.name} (@{friend.username})
      </h1>

      <div>
        <h4>Mutual Friends</h4>
        <ul>
          {friend.mutualFriends.map((mutualFriend) => {
            return (
              <li key={mutualFriend.id}>
                <img
                  src={mutualFriend.avatarURL}
                  alt={mutualFriend.name}
                  width={10}
                  height={10}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
