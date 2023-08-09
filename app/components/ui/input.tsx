export default function Input(props) {
  return <input className="border-2 p-2 focus:outline-blue-500 w-full" id={props.id} name={props.name} type={props.type} autoComplete={props.autoComplete} required={props.required} placeholder={props.placeholder} />;
}
