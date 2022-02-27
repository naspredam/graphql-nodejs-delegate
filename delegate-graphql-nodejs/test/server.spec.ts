import { preparedAppObserver } from '@core/server';
import { schemas } from '@test-data/schema';
import express, { Express } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { Server } from 'http';
import { queries } from '@test-data/query-graphql-posts';
import { responses } from '@test-data/response-graphql-posts';
import request from 'supertest';
import { always, cond, equals, T } from 'ramda';

describe('Set of tests for graphql requests', () => {

    var app: Express;
    var server: Server;
    var remoteServer: Server;

    beforeAll((done) => {
        const remotePort = 64688;
        remoteServer = startRemoteGraphQL()
            .listen(remotePort, () => {
                preparedAppObserver(`http://localhost:${remotePort}/graphql`)
                    .subscribe((appExpress: Express) => {
                        app = appExpress
                        server = app.listen((err: Error) => (err) ? done(err) : done());
                    });
            })
    });

    afterAll((done) => {
        server.close();
        remoteServer.close();
        done();
    })

    it('should return the basic call for limitted call of the graphql', (done) => {
        request(app)
            .post('/graphql')
            .send({ query: queries.queryWithOnlyIds })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err: any, res: any) => {
                if (err) return done(err);
                expect(res.body).toMatchObject(responses.responseBodyIds);
                done()
            });
    });

    it('should return the all fields available on the graphql schema', (done) => {
        request(app)
            .post('/graphql')
            .send({ query: queries.queryAllFields })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err: any, res: any) => {
                if (err) return done(err);
                expect(res.body).toMatchObject(responses.responseBodyWithAllFields);
                done()
            });
    });

    const startRemoteGraphQL = (): Express => {
        const app: Express = express();
        app.use('/graphql', graphqlHTTP({
            schema: schemas.remoreSchema,
            rootValue: {
                findById: (args: any) => cond([
                    [equals(['1', '4']), always(responses.responseBodyTwoPostsFromRemote)],
                    [equals(['8']), always(responses.responseBodyOnePostsFromRemote)],
                ])(args.ids)
            },
        }));
        return app;
    };

});