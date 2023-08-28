import { UserPlusIcon, ChatBubbleLeftRightIcon, InformationCircleIcon, EllipsisHorizontalIcon, XMarkIcon, HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon, VideoCameraIcon, PhotoIcon, FaceSmileIcon } from "@heroicons/react/24/solid";

import { json, type LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import Button from "~/components/ui/button";
import ButtonLink from "~/components/ui/button-link";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import { prisma } from "~/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      posts: {
        include: {
          user: true,
        },
      },
    },
  });
  return json({ user });
};

export default function RouteComponent() {
  const { user } = useLoaderData<typeof loader>();
  if (!user) {
    return (
      <div className="container mx-auto max-w-6xl min-h-screen pt-16 md:pt-24">
        <div className="container mx-auto max-w-2xl bg-white flex border border-blue-500 mb-4">
          <span className="bg-blue-500 px-3 py-2">
            <InformationCircleIcon className="w-8 h-8 text-white"></InformationCircleIcon>
          </span>
          <div className="py-2">
            <h2 className="pl-4 text-lg">You must log in to continue.</h2>
          </div>
        </div>

        <div className="container mx-auto max-w-2xl bg-white">
          <h1 className="text-center pt-6 text-2xl">Log in to Facebook</h1>
          <Form className="flex flex-col px-8 pt-8 pb-4 items-center" method="POST">
            <div className="w-full mb-4">
              <Label htmlFor="email" />
              <Input id="email" name="email" type="text" autoComplete="email" required placeholder="Email or Phone Number" />
            </div>
            <div className="w-full mb-4">
              <Label htmlFor="password" />
              <Input id="password" name="password" type="text" autoComplete="password" required placeholder="Password" />
            </div>

            <Button>Log in</Button>
          </Form>
          <div className="flex px-8 pb-8">
            <ButtonLink to="/signup">Create New Account</ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl min-h-screen flex flex-col items-start pb-4">
      {user.coverURL && <img className="w-full h-96 bg-cover object-cover rounded-md mb-4" src={user.coverURL} alt={user.name} />}

      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row justify-center items-center px-4 py-6 bg-white mb-6">
        {user.avatarURL && <img className="w-32 h-32 rounded-full bg-cover" src={user.avatarURL} alt={user.name} />}
        <div className="px-4 space-y-2 mb-4 md:mr-auto">
          <h3 className=" text-2xl md:text-3xl text-center font-bold text-black">{user.name}</h3>
        </div>
        <div className="flex gap-x-2 h-8 self-center">
          <Button variant="secondary">
            <UserPlusIcon className="w-4 h-4" /> Friend
          </Button>
          <Button variant="primary">
            <ChatBubbleLeftRightIcon className="w-4 h-4" /> Message
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row ">
        <ul className="md:mr-6">
          {user.posts.map((post) => {
            return (
              <li className="max-w-4xl mx-auto h-fit rounded bg-white mb-6" key={post.id}>
                <div className="flex gap-x-2 p-2">
                  {post.user?.avatarURL && <img className="w-10 h-10 rounded-full" src={post.user?.avatarURL} alt={post.user.name} />}
                  <div className="mr-auto">
                    <p className="font-semibold text-sm">{post.user.name}</p>
                    <p className="text-sm">{post.createdAt}</p>
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

                <p className="pl-14">{post.text}</p>

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

        <div className="container max-w-full bg-white h-fit p-2 rounded">
          <div className="flex mb-4">
            {user.avatarURL && <img className="w-11 h-11 rounded-full bg-cover mr-2" src={user.avatarURL} alt={user.name} />}
            <button className="w-full rounded-full text-left py-2 px-4 text-lg md:text-xl bg-slate-200 text-gray-500 font-semibold">What's on your mind?</button>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-around gap-x-1">
            <button className="flex items-center justify-center gap-x-1 hover:bg-slate-200 md:px-2 md:py-1">
              <VideoCameraIcon className="w-3 h-3 md:w-5 md:h-5 text-red-500"></VideoCameraIcon>
              <p className="font-semibold text-xs md:text-sm text-gray-500">Live video</p>
            </button>
            <button className="flex items-center justify-center gap-x-1 hover:bg-slate-200 md:px-2 md:py-1">
              <PhotoIcon className="w-3 h-3 md:w-5 md:h-5 text-green-500"></PhotoIcon>
              <p className="font-semibold text-xs md:text-sm text-gray-500">Photo/video</p>
            </button>
            <button className="flex items-center justify-center gap-x-1 hover:bg-slate-200 md:px-2 md:py-1">
              <FaceSmileIcon className="w-3 h-3 md:w-5 md:h-5 text-yellow-300"></FaceSmileIcon>
              <p className="font-semibold text-xs md:text-sm text-gray-500">Feeling/activity</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
