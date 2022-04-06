import { protectedResolver } from '../users/users.utils';

export default {
  Photo: {
    user: ({ userId }, _, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
  },
  Hashtag: {
    photos: ({ id }, { page }, { client, isLoggedInUser }) => {
      if (isLoggedInUser) {
        return client.hashtag
          .findUnique({
            where: {
              id,
            },
          })
          .photos({
            take: 5,
            skip: (page - 1) * 5,
          });
      }
    },
    totalPhotos: ({ id }, _, { client }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
