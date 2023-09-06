import * as Dialog from "@radix-ui/react-dialog";
import { Form } from "@remix-run/react";
import Button from "~/components/ui/button";

export default function DialogPosts() {
  return (
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
              <Button variant="secondary" type="submit">
                Post
              </Button>
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
  );
}
