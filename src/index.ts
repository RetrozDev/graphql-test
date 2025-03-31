import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from 'node:fs';
import { resolvers } from './resolver.ts';
import { gql } from 'graphql-tag';
import { serverConfig } from './config/config.ts';

const typeDefs = gql(readFileSync('./src/schema.gql', 'utf-8'));
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
    listen: { port: serverConfig.port },
});

console.log(`🚀  Server ready at: ${url}`);
