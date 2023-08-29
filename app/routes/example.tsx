import * as Dialog from "@radix-ui/react-dialog";

export default function Example() {
  return (
    <div className="container mx-auto max-w-6xl p-4 text-center min-h-screen">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="text-gray-600 inline-flex h-[35px] items-center justify-center rounded-[10px] bg-slate-200 px-[15px] font-semibold leading-none focus:outline-none">What's on your mind?</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">Create post</Dialog.Title>
            <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal"></Dialog.Description>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label className="text-black w-[90px] text-right text-[15px]" htmlFor="name">
                Name
              </label>
              <input className="text-black focus:outline-blue-500 outline-blue-500 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] border border-blue-500" id="name" placeholder="name" />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label className="text-violet11 w-[90px] text-right text-[15px]" htmlFor="message">
                Message
              </label>
              <textarea
                className="text-black text-left focus:outline-blue-500 outline-blue-500 inline-flex h-[100px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] border border-blue-500"
                id="message"
                placeholder="message"
              />
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button className="bg-green4 text-white hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none border border-blue-500 bg-blue-500">
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
    </div>
  );
}
