import { json, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import dataFriends from "~/data/friends.json";
import { EllipsisHorizontalIcon, XMarkIcon, HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon } from "@heroicons/react/24/solid";
export const loader = async () => {
  return json({ friends: dataFriends });
};

export const meta: V2_MetaFunction = () => {
  return [{ title: "Friendbook" }, { name: "description", content: "Facebook clone made by Reymond Julio" }];
};

export default function Index() {
  const { friends } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto max-w-6xl p-6">
      <ul>
        {friends.map((friend) => {
          return (
            <li className="max-w-2xl mx-auto h-fit rounded bg-white mb-6" key={friend.id}>
              <div className="flex gap-x-2 p-2">
                <img className="w-10 h-10 rounded-full" src={friend.avatarURL} alt={friend.name} />
                <div className="mr-auto">
                  <p className="font-semibold text-sm">{friend.name}</p>
                  <p className="text-sm">19h</p>
                </div>
                <div className="flex gap-x-2">
                  <button>
                    <EllipsisHorizontalIcon className="w-6 h-6"></EllipsisHorizontalIcon>
                  </button>
                  <button>
                    <XMarkIcon className="w-6 h-6"></XMarkIcon>
                  </button>
                </div>
              </div>

              <img className="w-full object-cover" src={friend.coverURL} alt={friend.name} />
              <div className="flex justify-around p-4">
                <button className="flex gap-x-2 items-center hover:bg-slate-200 px-4">
                  <span>
                    <HandThumbUpIcon className="w-5 h-5 text-slate-500"></HandThumbUpIcon>
                  </span>
                  <p className="text-sm">Like</p>
                </button>

                <button className="flex gap-x-2 items-center hover:bg-slate-200 px-4">
                  <span>
                    <ChatBubbleLeftIcon className="w-5 h-5 text-slate-500"></ChatBubbleLeftIcon>
                  </span>
                  <p className="text-sm">Comment</p>
                </button>

                <button className="flex gap-x-2 items-center hover:bg-slate-200 px-4">
                  <span>
                    <ShareIcon className="w-5 h-5 text-slate-500"></ShareIcon>
                  </span>
                  <p className="text-sm">Share</p>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
