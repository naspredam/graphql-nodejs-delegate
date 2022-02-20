import { introspectRemoteSchema, wrapRemoteSchema, addsResolvers } from '@core/schemas';
import { GraphQLSchema } from 'graphql';
import { defer, map, retry, Observable } from 'rxjs';
import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';

const prepareAppWithSchema = (schema: GraphQLSchema) => {
    const app: Express = express();
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }));
    return app;
}

export const preparedAppObserver: Observable<Express> =
    defer(introspectRemoteSchema)
        .pipe(
            map(wrapRemoteSchema),
            map(addsResolvers),
            map(prepareAppWithSchema),
            retry(3)
        );
