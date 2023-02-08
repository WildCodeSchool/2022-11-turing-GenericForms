import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { FormResolver, UserResolver } from './graphql/resolvers';
import datasource from './lib/datasource';
import "reflect-metadata";
import { buildSchema } from 'type-graphql';
import * as dotenv from 'dotenv' 
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