import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { EllipsisHorizontalIcon, XMarkIcon, HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon } from "@heroicons/react/24/solid";
import { prisma } from "~/db.server";
import { formatDate } from "~/utils/date";
import DialogNewPost from "~/components/shared/dialog-new-post";

export const loader = async ({ request }: LoaderArgs) => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
  });

  return json({ posts });
};

export const meta: V2_MetaFunction = () => {
  return [{ title: "Friendbook" }, { name: "description", content: "Facebook clone made by Reymond Julio" }];
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto max-w-6xl min-h-screen p-6">
      <DialogNewPost />
      <ul>
        {posts.map((post) => {
          return (
            <li className="max-w-2xl mx-auto h-fit rounded bg-white mb-6" key={post.id}>
              <div className="flex gap-x-2 p-2">
                <Link to={`/${post.user.username}`}> {post.user?.avatarURL && <img className="w-10 h-10 rounded-full" src={post.user?.avatarURL} alt={post.user.name} />}</Link>

                <div className="mr-auto">
                  <p className="font-semibold text-sm">{post.user.name}</p>
                  <p className="text-sm">{formatDate(post.createdAt)}</p>
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

              <p className="pl-3">{post.text}</p>

              <div className="flex justify-between p-4">
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
