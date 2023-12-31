interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return <input className="border py-1 px-2 w-full rounded-lg border-slate-400 placeholder-gray-400 focus:outline-blue-200" {...props} />;
}
