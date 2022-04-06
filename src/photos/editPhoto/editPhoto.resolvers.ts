import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { client, loggedInUser }) => {
        const photoToUpdate = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        if (!photoToUpdate) {
          return {
            ok: false,
            error: 'Photo not found.',
          };
        }
        await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: photoToUpdate.hashtags,
              connectOrCreate: processHashtags(caption),
            },
          },
        });
        return {
          ok: true,
        };
      },
    ),
  },
};
