import { join } from 'path';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';


const remoreSchema = loadSchemaSync(
    join(__dirname, "./remote-schema.graphql"),
    { loaders: [ new GraphQLFileLoader() ] });

export const schemas = {
    remoreSchema
}