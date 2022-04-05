import { createWriteStream } from 'fs';
import * as bcrypt from 'bcrypt';
import { GraphQLUpload } from 'graphql-upload';
import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';

const resolverFn = async (
  _: any,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser, client },
) => {
  let avatarUrl = null;
  if (avatar) {
    const { filename, createReadStream } = await avatar.file;
    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    const writeStream = createWriteStream(
      process.cwd() + '/uploads/' + newFilename,
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;
  }

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
      ...(avatarUrl && { avatar: avatarUrl }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: 'Could not update profile',
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};

export default { resolvers, Upload: GraphQLUpload };
