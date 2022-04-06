import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser, client }) => {
        let hashtagObjects = [];
        if (caption) {
          hashtagObjects = processHashtags(caption);
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObjects.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObjects,
              },
            }),
          },
        });
      },
    ),
  },
};
