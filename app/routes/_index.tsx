import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Friendbook" },
    { name: "description", content: "Facebook clone made by Reymond Julio" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Friendbook</h1>
    </div>
  );
}
