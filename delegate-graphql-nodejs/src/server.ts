import { instropectRemoteSchema, stitchingSchemas, localSchema } from '@core/schemas';
import { GraphQLSchema } from 'graphql';
import { map, retry, Observable, forkJoin } from 'rxjs';
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
    forkJoin({
        remote: instropectRemoteSchema(remoteGraphQL),
        local: localSchema,
    })
    .pipe(
        map(stitchingSchemas),
        map(prepareAppWithSchema),
        retry(3));
