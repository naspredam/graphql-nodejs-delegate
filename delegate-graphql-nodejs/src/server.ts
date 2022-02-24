import { introspectRemoteSchema, wrapRemoteSchema, stitchingSchemas } from '@core/schemas';
import { curry } from 'ramda';
import { GraphQLSchema } from 'graphql';
import { defer, map, retry, Observable } from 'rxjs';
import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';

const prepareAppWithSchema = (schema: GraphQLSchema): Express => {
    const app: Express = express();
    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true
    }));
    return app;
}

export const preparedAppObserver = (remoteGraphQL: string): Observable<Express> =>
    defer(introspectRemoteSchema(remoteGraphQL))
        .pipe(
            map(wrapRemoteSchema(remoteGraphQL)),
            map(stitchingSchemas),
            map(prepareAppWithSchema),
            retry(3)
        );
