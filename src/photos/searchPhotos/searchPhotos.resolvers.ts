export default {
  Query: {
    searchPhotos: (_, { keyword, page }, { client }) =>
      client.photo.findMany({
        where: { caption: { startsWith: keyword } },
        take: 5,
        skip: (page - 1) * 5,
      }),
  },
};
