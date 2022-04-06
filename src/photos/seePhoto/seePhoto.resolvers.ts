import client from '../../client';

export default {
  Query: {
    seePhoto: (_, { id }, { cleint }) =>
      client.photo.findUnique({ where: { id } }),
  },
};
