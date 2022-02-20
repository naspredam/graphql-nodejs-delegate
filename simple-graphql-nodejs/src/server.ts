import { Post } from '@core/types';
import { all, findByIdIn } from '@core/repository';
import { join } from 'path';
import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const schema = loadSchemaSync(
    join(__dirname, './graphql/*.graphql'),
    { loaders: [ new GraphQLFileLoader() ] });

const rootValue = {
    posts: (): Post[] => {
        console.log(new Date(), " - posts...")
        return all;
    },
    findById: (args: any) => {
        console.log(new Date(), " - findById...")
        return findByIdIn(args.ids);
    }
};

export const prepareApp = (): Express => {
    const app: Express = express();
    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue,
        graphiql: true
    }));
    return app;
};