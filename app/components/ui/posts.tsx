import * as Dialog from "@radix-ui/react-dialog";
import { json, type LoaderArgs, type ActionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Button from "./button";
import { FaceSmileIcon, PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { prisma } from "~/db.server";
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

export default function Posts() {
  const { user } = useLoaderData<typeof loader>();
  if (!user) {
    return (
      <div>
        <h1>Post not found</h1>
      </div>
    );
  }
  return (
    <div className="container flex flex-col justify-center max-w-full bg-white h-fit px-5 pt-5 pb-4 md:pb-9 rounded">
      <div className="flex mb-4 items-center">
        {user.avatarURL && <img className="w-12 h-12 rounded-full bg-cover mr-2" src={user.avatarURL} alt={user.name} />}

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="w-full hover:bg-slate-100 rounded-full text-gray-600 p-4 text-left bg-slate-200 font-semibold leading-none focus:outline-none">What's on your mind?</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Form className="w-full" method="POST">
                <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">Create post</Dialog.Title>
                <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal"></Dialog.Description>

                <div className="mb-[15px] flex items-center gap-5">
                  <label className="text-violet11 w-[90px] text-right text-[15px] hidden" htmlFor="message">
                    Message
                  </label>
                  <textarea className="text-black text-left outline-none p-0 inline-flex h-[100px] w-full flex-1 items-center justify-center rounded-lg text-lg" id="message" placeholder="What's on your mind?" name="message" />
                </div>
                <div className="mt-[25px] flex justify-end">
                  <Button type="submit">Post</Button>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                    aria-label="Close"
                  ></button>
                </Dialog.Close>
              </Form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
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
  );
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const message = formData.get("message")?.toString();
  if (!message) return null;

  await prisma.post.create({
    data: { text: message, user: { connect: { username: "reymond" } } },
  });

  return null;
}
