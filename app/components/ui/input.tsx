interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return (
    <input className="border-2 p-2 focus:outline-blue-500 w-full" {...props} />
  );
}
