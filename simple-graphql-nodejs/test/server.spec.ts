import { prepareApp } from '@core/server';
import request from 'supertest';
import { Server } from 'http';
import { Express } from 'express';
import { queries } from '@test-data/query-graphql-posts';
import { responses } from '@test-data/response-graphql-posts';

describe('Set of tests for graphql requests', () => {

    var app: Express;
    var server: Server;

    beforeAll((done) => {
        app = prepareApp();
        server = app.listen((err: Error) => (err) ? done(err) : done());
    });

    afterAll((done) => {
        server.close();
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
                expect(res.body).toStrictEqual(responses.responseBodyIds);
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
                expect(res.body).toStrictEqual(responses.responseBodyWithAllFields);
                done()
            });
    });

    it('should get only ids for the filter query', (done) => {
        request(app)
            .post('/graphql')
            .send({ query: queries.queryFindByIdWithOnlyIds })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err: any, res: any) => {
                if (err) return done(err);
                expect(res.body).toStrictEqual(responses.responseBodyFilteredBodyIds);
                done()
            });
    });

    it('should all fields with filter query', (done) => {
        request(app)
            .post('/graphql')
            .send({ query: queries.queryFindByIdWithOnlyIds })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err: any, res: any) => {
                if (err) return done(err);
                expect(res.body).toStrictEqual(responses.responseBodyFilteredBodyIds);
                done()
            });
    });

});