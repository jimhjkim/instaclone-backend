import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio },
  { loggedInUser, client }
) => {
  let encryptedPassword = null;
  if (newPassword) {
    encryptedPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(encryptedPassword && { password: encryptedPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile",
    };
  }
};


const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};

export default resolvers;