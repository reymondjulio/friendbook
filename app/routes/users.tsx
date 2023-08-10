import type { LoaderArgs } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => [
  // your meta here
];

export const loader = async ({ request }: LoaderArgs) => {
  return null;
};

export default function RouteComponent() {
  const data = useLoaderData<typeof loader>();
  return <div />;
}
