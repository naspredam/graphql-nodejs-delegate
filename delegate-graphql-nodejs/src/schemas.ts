import { getIds } from '@core/repository';
import { join } from 'path';
import { fetch } from 'cross-undici-fetch';
import { print, GraphQLSchema, OperationTypeNode } from 'graphql';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap';
import { AsyncExecutor } from '@graphql-tools/utils';
import { delegateToSchema } from '@graphql-tools/delegate';
import { stitchSchemas } from '@graphql-tools/stitch';

export const localSchema = loadSchema(
    join(__dirname, './graphql/*.graphql'),
    { loaders: [new GraphQLFileLoader()] });

const remoteExecutor = (remoteGraphQL: string): AsyncExecutor => async ({ document, variables }: any) => {
    const query = print(document)
    const fetchResult = await fetch(remoteGraphQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    })
    return fetchResult.json();
}

export const instropectRemoteSchema = async (remoteGraphQL: string) => wrapSchema({
    schema: await introspectSchema(remoteExecutor(remoteGraphQL)),
    executor: remoteExecutor(remoteGraphQL),
});

export const stitchingSchemas = (graphQLSchemas: { remote: GraphQLSchema; local: GraphQLSchema; }) => stitchSchemas({
    subschemas: [
        { schema: graphQLSchemas.local },
        { schema: graphQLSchemas.remote }
    ],
    resolvers: {
        Query: {
            filterPosts: (parent: any, args: any, context: any, info: any) =>
                delegateToSchema({
                    schema: graphQLSchemas.remote,
                    operation: OperationTypeNode.QUERY,
                    fieldName: 'findById',
                    args: { ids: getIds(args.group) },
                    context,
                    info,
                })
        }
    }
});
