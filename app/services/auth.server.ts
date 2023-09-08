import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";

import { prisma } from "~/db.server";
import { sessionStorage } from "~/services/session.server";

type User = {
  id: string;
};

export let authenticator = new Authenticator<User>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = String(form.get("email"));
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AuthorizationError("User is not found");
    }

    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    return {
      id: user.id,
    };
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
