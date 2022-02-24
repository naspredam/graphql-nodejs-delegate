import { getIds } from '@core/repository';
import { join } from 'path';
import { fetch } from 'cross-undici-fetch';
import { print, GraphQLSchema, OperationTypeNode } from 'graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap';
import { AsyncExecutor } from '@graphql-tools/utils';
import { addResolversToSchema } from '@graphql-tools/schema';
import { delegateToSchema } from '@graphql-tools/delegate';
import { stitchSchemas } from '@graphql-tools/stitch';

const localSchema = () => loadSchemaSync(
    join(__dirname, './graphql/*.graphql'),
    { loaders: [new GraphQLFileLoader()] });

const remoteExecutor = (remoteGraphQL: string): AsyncExecutor => async ({ document, variables }: any) => {
    const query = print(document)
    const fetchResult = await fetch(remoteGraphQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    })
    return fetchResult.json()
}

export const introspectRemoteSchema = (remoteGraphQL: string) => () => introspectSchema(remoteExecutor(remoteGraphQL))

export const wrapRemoteSchema = (remoteGraphQL: string) => (remoteSchema: GraphQLSchema): GraphQLSchema => wrapSchema({
    schema: remoteSchema,
    executor: remoteExecutor(remoteGraphQL),
});

export const stitchingSchemas = (remoteSchema: GraphQLSchema) => stitchSchemas({
    subschemas: [
        { schema: remoteSchema },
        { schema: localSchema() }
    ],
    resolvers: {
        Query: {
            filterPosts: (parent: any, args: any, context: any, info: any) =>
                delegateToSchema({
                    schema: remoteSchema,
                    operation: OperationTypeNode.QUERY,
                    fieldName: 'findById',
                    args: { ids: getIds(args.group) },
                    context,
                    info,
                })
        }
    }
});
