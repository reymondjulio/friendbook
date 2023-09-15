import * as Dialog from "@radix-ui/react-dialog";

import { Form } from "@remix-run/react";
import Button from "~/components/ui/button";
import { FaceSmileIcon, PhotoIcon, VideoCameraIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRootLoaderData } from "~/hooks/use-root-loader-data";

export default function DialogNewPost() {
  const { userDatabase } = useRootLoaderData();

  if (!userDatabase) {
    return null;
  }

  return (
    <div className="container mx-auto flex flex-col justify-center max-w-2xl bg-white h-fit px-5 pt-5 pb-4 md:pb-0 mb-6 sm:mb-4 rounded-lg">
      <div className="flex mb-4 items-center">
        {userDatabase.avatarURL && <img className="w-12 h-12 rounded-full bg-cover mr-2" src={userDatabase.avatarURL} alt={userDatabase.name} />}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="w-full text-sm md:text-md lg:text-lg hover:bg-slate-100 rounded-full text-gray-600 p-4 text-left bg-slate-200 font-semibold leading-none focus:outline-none">What's on your mind?</button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-slate-200 bg-opacity-70 data-[state=open]:animate-overlayShow fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Form className="w-full" method="POST">
                <Dialog.Title className="text-center mb-4 text-lg font-medium">Create post</Dialog.Title>
                <Dialog.Description></Dialog.Description>
                <hr className="w-full mt-6" />
                <div className="mb-4 flex items-center gap-5">
                  <label className="text-black hidden" htmlFor="message">
                    Message
                  </label>
                  <textarea className="text-black text-left outline-none p-2 inline-flex h-36 w-full flex-1 items-center justify-center rounded-lg text-lg" id="message" placeholder="What's on your mind?" name="message" />
                </div>
                <div className="mt-6 flex">
                  <Button variant="secondary" type="submit">
                    Post
                  </Button>
                </div>
                <Dialog.Close asChild>
                  <button className="absolute top-5 right-4 inline-flex p-2 appearance-none items-center justify-center rounded-full bg-slate-300 hover:bg-slate-200 focus:outline-none" aria-label="Close">
                    <XMarkIcon className="w-6 h-6 text-gray-500"></XMarkIcon>
                  </button>
                </Dialog.Close>
              </Form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      <hr className="mb-4" />

      <div className="flex flex-wrap justify-between md:pb-2 items-center gap-x-1 gap-y-2">
        <button className="flex items-center justify-center gap-x-2 hover:bg-slate-200 md:px-2 md:py-1 rounded-lg">
          <VideoCameraIcon className="w-3 h-3 md:w-5 md:h-5 text-red-500"></VideoCameraIcon>
          <p className="font-semibold text-xs sm:text-sm text-gray-500">Live video</p>
        </button>
        <button className="flex items-center justify-center gap-x-2 hover:bg-slate-200 md:px-2 md:py-1 rounded-lg">
          <PhotoIcon className="w-3 h-3 md:w-5 md:h-5 text-green-500"></PhotoIcon>
          <p className="font-semibold text-xs sm:text-sm text-gray-500">Photo/video</p>
        </button>
        <button className="flex items-center justify-center gap-x-2 hover:bg-slate-200 md:px-2 md:py-1 rounded-lg">
          <FaceSmileIcon className="w-3 h-3 md:w-5 md:h-5 text-yellow-300"></FaceSmileIcon>
          <p className="font-semibold text-xs sm:text-sm text-gray-500">Feeling/activity</p>
        </button>
      </div>
    </div>
  );
}
