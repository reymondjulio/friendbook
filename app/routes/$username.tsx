import { UserPlusIcon, ChatBubbleLeftRightIcon, InformationCircleIcon, EllipsisHorizontalIcon, XMarkIcon, HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon, VideoCameraIcon, PhotoIcon, FaceSmileIcon } from "@heroicons/react/24/solid";

import { json, type LoaderArgs, type ActionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import Button from "~/components/ui/button";
import ButtonLink from "~/components/ui/button-link";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import * as Dialog from "@radix-ui/react-dialog";
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

            <Button type="submit">Log in</Button>
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

      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row">
        <ul className="md:mr-6">
          {user.posts.map((post) => {
            return (
              <li className="max-w-4xl mx-auto h-fit rounded bg-white mb-6 p-4" key={post.id}>
                <div className="flex gap-x-2 items-start mb-2 md:p-2">
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

                <p className="mb-2 md:ml-2 text-sm">{post.text}</p>

                <hr className="mb-4" />

                <div className="flex justify-between items-center">
                  <button className="flex gap-x-1 items-center hover:bg-slate-200 px-4">
                    <span>
                      <HandThumbUpIcon className="w-3 h-3 md:w-5 md:h-5 text-slate-500"></HandThumbUpIcon>
                    </span>
                    <p className="text-xs">Like</p>
                  </button>

                  <button className="flex gap-x-1 items-center hover:bg-slate-200 px-4">
                    <span>
                      <ChatBubbleLeftIcon className="w-3 h-3 md:w-5 md:h-5 text-slate-500"></ChatBubbleLeftIcon>
                    </span>
                    <p className="text-xs">Comment</p>
                  </button>

                  <button className="flex gap-x-1 items-center hover:bg-slate-200 px-4">
                    <span>
                      <ShareIcon className="w-3 h-3 md:w-5 md:h-5 text-slate-500"></ShareIcon>
                    </span>
                    <p className="text-xs">Share</p>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="container flex flex-col justify-center max-w-full bg-white h-fit px-5 pt-5 pb-4 md:pb-9 rounded">
          <div className="flex mb-4 items-center">
            {user.avatarURL && <img className="w-12 h-12 rounded-full bg-cover mr-2" src={user.avatarURL} alt={user.name} />}
            <Form className="w-full" method="POST">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <button className="w-full hover:bg-slate-100 rounded-full text-gray-600 p-4 text-left bg-slate-200 font-semibold leading-none focus:outline-none">What's on your mind?</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                  <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">Create post</Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal"></Dialog.Description>
                    <div className="mb-[15px] flex items-center gap-5">
                      <label className="text-black w-[90px] text-right text-[15px]" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="text-black focus:outline-blue-500 outline-blue-500 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] border border-blue-500"
                        id="name"
                        placeholder="name"
                      />
                    </div>
                    <div className="mb-[15px] flex items-center gap-5">
                      <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        className="text-black text-left focus:outline-blue-500 outline-blue-500 inline-flex h-[100px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] border border-blue-500"
                        id="message"
                        placeholder="message"
                      />
                    </div>
                    <div className="mt-[25px] flex justify-end">
                      <Dialog.Close asChild>
                        <button
                          type="submit"
                          className="bg-green4 text-white hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none border border-blue-500 bg-blue-500"
                        >
                          Post
                        </button>
                      </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                        aria-label="Close"
                      ></button>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </Form>
          </div>

          <hr className="mb-4" />

          <div className="flex justify-between items-center gap-x-1 ">
            <button className="flex items-center justify-center md:mt-4 gap-x-1 hover:bg-slate-200 md:px-2 md:py-1">
              <VideoCameraIcon className="w-3 h-3 md:w-5 md:h-5 text-red-500"></VideoCameraIcon>
              <p className="font-semibold text-xs sm:text-sm text-gray-500">Live video</p>
            </button>
            <button className="flex items-center justify-center md:mt-4  gap-x-1 hover:bg-slate-200 md:px-2 md:py-1">
              <PhotoIcon className="w-3 h-3 md:w-5 md:h-5 text-green-500"></PhotoIcon>
              <p className="font-semibold text-xs sm:text-sm text-gray-500">Photo/video</p>
            </button>
            <button className="flex items-center justify-center md:mt-4  gap-x-1 hover:bg-slate-200 md:px-2 md:py-1">
              <FaceSmileIcon className="w-3 h-3 md:w-5 md:h-5 text-yellow-300"></FaceSmileIcon>
              <p className="font-semibold text-xs sm:text-sm text-gray-500">Feeling/activity</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  console.log({ email, password });

  return null;
}
