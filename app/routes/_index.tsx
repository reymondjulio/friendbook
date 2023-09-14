import type { LoaderArgs, ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { EllipsisHorizontalIcon, XMarkIcon, HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon } from "@heroicons/react/24/solid";
import { prisma } from "~/db.server";
import { formatDate } from "~/utils/date";
import DialogNewPost from "~/components/shared/dialog-new-post";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
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
            <li className="max-w-2xl mx-auto h-fit rounded-lg bg-white mb-4 px-4 pt-2" key={post.id}>
              <div className="flex flex-wrap gap-x-2 gap-y-2 p-2">
                <Link to={`/${post.user.username}`}>
                  {post.user?.avatarURL && (
                    <img
                      className="w-10 h-10 rounded-full object-cover overflow-hidden bg-white 
                 hover:bg-opacity-80"
                      src={post.user?.avatarURL}
                      alt={post.user.name}
                    />
                  )}
                </Link>

                <div className="mr-auto">
                  <Link to={`/${post.user.username}`}>
                    <p className="font-semibold text-sm">{post.user.name}</p>
                  </Link>

                  <p className="text-sm">{formatDate(post.createdAt)}</p>
                </div>
                <div className="gap-x-2 hidden sm:block">
                  <button>
                    <EllipsisHorizontalIcon className="w-6 h-6"></EllipsisHorizontalIcon>
                  </button>
                  <button>
                    <XMarkIcon className="w-6 h-6"></XMarkIcon>
                  </button>
                </div>
              </div>

              <p className="pl-2 mb-3">{post.text}</p>

              <hr className="w-full" />

              <div className="flex flex-wrap gap-y-1 sm:flex-row justify-between py-3">
                <button className="flex gap-x-2 items-center justify-start hover:bg-slate-200 px-3 py-1 rounded-lg">
                  <span>
                    <HandThumbUpIcon className="w-3 h-3 md:w-5 md:h-5 text-slate-500"></HandThumbUpIcon>
                  </span>
                  <p className="text-xs sm:text-sm">Like</p>
                </button>

                <button className="flex gap-x-2 items-center justify-start hover:bg-slate-200 px-3 py-1 rounded-lg">
                  <span>
                    <ChatBubbleLeftIcon className="w-3 h-3 md:w-5 md:h-5 text-slate-500"></ChatBubbleLeftIcon>
                  </span>
                  <p className="text-xs sm:text-sm">Comment</p>
                </button>

                <button className="flex gap-x-2 items-center hover:bg-slate-200 px-3 py-1 rounded-lg">
                  <span>
                    <ShareIcon className="w-3 h-3 md:w-5 md:h-5 text-slate-500"></ShareIcon>
                  </span>
                  <p className="text-xs sm:text-sm">Share</p>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const action = async ({ request }: ActionArgs) => {
  const userSession = await authenticator.isAuthenticated(request);
  if (!userSession) return null;

  const formData = await request.formData();
  const message = String(formData.get("message"));

  const post = await prisma.post.create({
    data: {
      text: message,
      userId: userSession.id,
    },
  });
  if (!post) return null;

  return null;
};
