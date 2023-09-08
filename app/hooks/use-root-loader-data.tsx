import type { Prisma } from "@prisma/client";
import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import type { prisma } from "~/db.server";
import type { UserSession } from "~/services/auth.server";

export type UserDatabase = NonNullable<
  Prisma.PromiseReturnType<typeof prisma.user.findUnique>
>;

export type RootLoaderData = {
  userSession: UserSession | undefined;
  userDatabase: UserDatabase | undefined;
};

export function useMatchesData(
  routeId: string
): Record<string, unknown> | RootLoaderData {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === routeId),
    [matchingRoutes, routeId]
  );
  return route?.data;
}

/**
 * Get data from the root route loader
 */
export function useRootLoaderData() {
  const { userSession, userDatabase } = useMatchesData(
    "root"
  ) as RootLoaderData;

  return {
    userSession,
    userDatabase,
  };
}
