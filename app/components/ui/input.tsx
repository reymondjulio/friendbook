interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return <input className="border py-1 px-2 w-full rounded-lg placeholder-gray-400 focus:outline-indigo-200" {...props} />;
}
