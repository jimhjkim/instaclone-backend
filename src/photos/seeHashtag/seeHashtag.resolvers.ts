export default {
  Query: {
    seeHashtag: (_, { hashtag }, { client }) =>
      client.hashtag.findUnique({ where: { hashtag } }),
  },
};
