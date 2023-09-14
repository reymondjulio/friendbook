import { UserPlusIcon, ChatBubbleLeftRightIcon, InformationCircleIcon, EllipsisHorizontalIcon, XMarkIcon, HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon } from "@heroicons/react/24/solid";

import { json, type LoaderArgs, type ActionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import Button from "~/components/ui/button";
import ButtonLink from "~/components/ui/button-link";
import Input from "~/components/ui/input";
import Label from "~/components/ui/label";
import DialogNewPost from "~/components/shared/dialog-new-post";
import { prisma } from "~/db.server";
import { authenticator } from "~/services/auth.server";
import { formatDate } from "~/utils/date";

export const loader = async ({ params }: LoaderArgs) => {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: {
      posts: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
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

      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row justify-center items-center px-4 py-6 bg-white mb-6 rounded-lg">
        <Link to={`/${user.username}`}>{user.avatarURL && <img className="w-32 h-32 rounded-full object-cover overflow-hidden bg-white hover:bg-opacity-80" src={user.avatarURL} alt={user.name} />}</Link>

        <div className="px-4 space-y-2 mb-4 md:mr-auto">
          <Link to={`/${user.username}`}>
            <h3 className=" text-2xl md:text-3xl text-center font-bold text-black">{user.name}</h3>
          </Link>
        </div>
        <div className="flex gap-x-2 h-8 self-center">
          <Button variant="tertiary">
            <UserPlusIcon className="w-4 h-4" /> Friend
          </Button>
          <Button variant="secondary">
            <ChatBubbleLeftRightIcon className="w-4 h-4" /> Message
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row gap-x-4">
        <div className="flex flex-col gap-y-4 basis-1/2 mb-4 md:mb-0">
          <div className="container max-w-full h-fit flex flex-col gap-y-4 px-4 py-6 text-center bg-white rounded-lg">
            <h1 className="text-black text-left text-xl font-bold">Intro</h1>
            <div className="w-full h-auto text-gray-700 font-semibold text-md bg-slate-200 hover:bg-slate-100 rounded-lg py-1 cursor-pointer">Add bio</div>
            <div className="w-full h-auto text-gray-700 font-semibold text-md bg-slate-200 hover:bg-slate-100 rounded-lg py-1 cursor-pointer">Add details</div>
            <div className="w-full h-auto bg-slate-200 text-gray-700 font-semibold text-md hover:bg-slate-100 rounded-lg py-1 cursor-pointer">Add hobbies</div>
            <div className="w-full h-auto text-gray-700 font-semibold bg-slate-200 text-md hover:bg-slate-100 rounded-lg py-1 cursor-pointer">Add featured</div>
          </div>

          <div className="container max-w-full h-fit bg-white px-4 py-4">
            <div className="flex justify-between items-start">
              <h1 className="text-black text-left text-xl font-bold mb-4">Photos</h1>
              <p className="text-blue-500 text-md cursor-pointer px-2 py-1 hover:bg-slate-200 rounded-lg">See all photos</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="w-full h-24 bg-slate-200 hover:bg-slate-100 cursor-pointer rounded-l-lg p-1">1</div>
              <div className="w-full h-24 bg-slate-200 hover:bg-slate-100 cursor-pointer  p-1">2</div>
              <div className="w-full h-24 bg-slate-200 hover:bg-slate-100 cursor-pointer  rounded-r-lg p-1">3</div>
              <div className="w-full h-24 bg-slate-200 hover:bg-slate-100 cursor-pointer  rounded-l-lg p-1">4</div>
              <div className="w-full h-24 bg-slate-200 hover:bg-slate-100 cursor-pointer  p-1">5</div>
              <div className="w-full h-24 bg-slate-200 hover:bg-slate-100 cursor-pointer  rounded-r-lg p-1">6</div>
              <div className="w-full h-24 bg-slate-200 hover:bg-slate-100 cursor-pointer  rounded-l-lg p-1">7</div>
              <div className="w-full h-24 bg-slate-200 hover:bg-slate-100 cursor-pointer  p-1">8</div>
              <div className="w-full h-24 bg-slate-200 hover:bg-slate-100 cursor-pointer  rounded-r-lg p-1">9</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col basis-2/3">
          <DialogNewPost />
          <ul>
            {user.posts.map((post) => {
              return (
                <li className="flex flex-col mb-4 max-w-4xl mx-auto h-fit rounded-lg bg-white p-4" key={post.id}>
                  <div className="flex gap-x-2 items-start mb-2 md:p-2">
                    <Link to={`/${post.user.username}`}>{post.user?.avatarURL && <img className="w-10 h-10 rounded-full" src={post.user?.avatarURL} alt={post.user.name} />}</Link>

                    <div className="mr-auto">
                      <Link to={`/${post.user.username}`}>
                        <p className="font-semibold text-sm">{post.user.name}</p>
                      </Link>

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

                  <p className="mb-2 md:ml-2 text-sm">{post.text}</p>

                  <hr className="mb-4" />

                  <div className="flex justify-between items-center">
                    <button className="flex gap-x-1 items-center hover:bg-slate-200 px-3 py-1 rounded-lg">
                      <span>
                        <HandThumbUpIcon className="w-3 h-3 md:w-5 md:h-5 text-slate-500"></HandThumbUpIcon>
                      </span>
                      <p className="text-xs">Like</p>
                    </button>

                    <button className="flex gap-x-1 items-center hover:bg-slate-200 px-3 py-1 rounded-lg">
                      <span>
                        <ChatBubbleLeftIcon className="w-3 h-3 md:w-5 md:h-5 text-slate-500"></ChatBubbleLeftIcon>
                      </span>
                      <p className="text-xs">Comment</p>
                    </button>

                    <button className="flex gap-x-1 items-center hover:bg-slate-200 px-3 py-1 rounded-lg">
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
        </div>
      </div>
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
