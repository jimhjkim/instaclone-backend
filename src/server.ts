require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import express, { Express } from "express";
import client from "./client";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

const startServer = async (): Promise<void> => {
  const app: Express = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client
      };
    },
  });

  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  await new Promise<void>(r => app.listen({ port: PORT }, r));
  console.log(`🚀 Server is running on http://localhost:${PORT}${server.graphqlPath} ✅`)
}

startServer();
