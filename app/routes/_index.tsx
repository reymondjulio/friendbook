import type { LoaderArgs, ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import {
  EllipsisHorizontalIcon,
  XMarkIcon,
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { prisma } from "~/db.server";
import { formatDate } from "~/utils/date";
import DialogNewPost from "~/components/shared/dialog-new-post";
import { authenticator } from "~/services/auth.server";
import { useRootLoaderData } from "~/hooks";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Friendbook" },
    { name: "description", content: "Facebook clone made by Reymond Julio" },
  ];
};

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

export default function Index() {
  const { userDatabase } = useRootLoaderData();
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto max-w-6xl min-h-screen p-6">
      <DialogNewPost />

      <ul>
        {posts.map((post) => {
          const isPostOwner = post.user.username === userDatabase?.username;

          console.log(isPostOwner, post, userDatabase);

          return (
            <li
              className="max-w-2xl mx-auto h-fit rounded-lg bg-white mb-4 px-4 pt-2"
              key={post.id}
            >
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
                {isPostOwner && (
                  <div className="flex gap-2 items-center">
                    <button>
                      <EllipsisHorizontalIcon className="w-6 h-6"></EllipsisHorizontalIcon>
                    </button>
                    <Form method="DELETE">
                      <input
                        type="hidden"
                        name="_action"
                        defaultValue="delete-post-by-id"
                      />
                      <input
                        type="hidden"
                        name="postId"
                        defaultValue={post.id}
                      />
                      <button type="submit">
                        <XMarkIcon className="w-6 h-6"></XMarkIcon>
                      </button>
                    </Form>
                  </div>
                )}
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

  const _action = String(formData.get("_action"));

  // Create post
  if (_action === "create-post") {
    const message = String(formData.get("message"));
    const createdPost = await prisma.post.create({
      data: { text: message, userId: userSession.id },
    });
    if (!createdPost) return null;
  }

  // Delete post by ID
  if (_action === "delete-post-by-id") {
    const postId = String(formData.get("postId"));

    const foundPost = await prisma.post.findUnique({
      where: { id: postId, userId: userSession.id },
      include: { user: { select: { id: true } } },
    });
    if (!foundPost) return null;

    const isPostOwner = foundPost.user.id === userSession.id;
    if (!isPostOwner) return null;

    const deletedPost = await prisma.post.delete({
      where: { id: postId, userId: userSession.id },
    });
    if (!deletedPost) return null;
  }

  return null;
};
