import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { FormResolver, UserResolver } from './graphql/resolvers';
import datasource from './lib/datasource';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import * as dotenv from 'dotenv'
import { getPayloadFromToken } from './utils/authorization.utils';
import UserService from './services/user.service'; 
dotenv.config()


async function start(): Promise<void> {
    // Create the schema
  const schema = await buildSchema({
    resolvers: [FormResolver, UserResolver],
    validate: false,
  });

  // Create the apollo server
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    cors: {
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true, // true if you need cookies/authentication
      methods: ["GET", "POST", "OPTIONS"],
    },
    context: async ({req}) => {
      let user = null;
      const { authorization } = req.headers;
      if (authorization !== undefined) {
        const token = authorization?.split(" ")[1];
        const data: any = await getPayloadFromToken(token);
        data !== null && (user = await new UserService().readOneByEmail(data.email));
      }
      console.log("user ==>", user);
      return {user};
    }
  });

  await server.listen().then(async ({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    await datasource.initialize()
      .then(() => {
        console.log("DB has been initialized!")
      })
      .catch((err) => {
          console.error("Error DB initialization", err)
      })
  });
}

start().catch(console.error);
