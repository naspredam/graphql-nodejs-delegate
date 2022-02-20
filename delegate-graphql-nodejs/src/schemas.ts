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

export const remoteGraphQL = 'http://localhost:3000/graphql';

const localSchema = () => loadSchemaSync(
    join(__dirname, './graphql/*.graphql'),
    { loaders: [new GraphQLFileLoader()] });

const remoteExecutor: AsyncExecutor = async ({ document, variables }: any) => {
    const query = print(document)
    const fetchResult = await fetch(remoteGraphQL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    })
    const response = fetchResult.json()
    console.log('call ended...', response)
    return response;
}

export const introspectRemoteSchema = () => introspectSchema(remoteExecutor)

export const wrapRemoteSchema = (remoteSchema: GraphQLSchema) => {
    console.log(remoteSchema.getTypeMap())
    return wrapSchema({
        schema: remoteSchema,
        executor: remoteExecutor,
    });
}

const buildResolver = (subschema: GraphQLSchema) => {
    return {
        Query: {
            filterPosts: (parent: any, args: any, context: any, info: any) =>
                delegateToSchema({
                    schema: subschema,
                    operation: OperationTypeNode.QUERY,
                    fieldName: 'findById',
                    args: { ids: getIds(args.group) },
                    context,
                    info,
                })
        }
    }
};

export const addsResolvers = (remoteSchema: GraphQLSchema) =>
    addResolversToSchema({
        resolvers: buildResolver(remoteSchema),
        schema: localSchema()
    });
