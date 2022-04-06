export default {
  Photo: {
    user: ({ userId }, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }, { client }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
  },
  Hashtag: {
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
