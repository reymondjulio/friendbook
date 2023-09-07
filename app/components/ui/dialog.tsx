import * as Dialog from "@radix-ui/react-dialog";
import { Form } from "@remix-run/react";
import Button from "~/components/ui/button";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function DialogPosts() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-full hover:bg-slate-100 rounded-full text-gray-600 p-4 text-left bg-slate-200 font-semibold leading-none focus:outline-none">What's on your mind?</button>
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
  );
}
