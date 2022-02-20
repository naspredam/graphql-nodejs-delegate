import { prepareApp } from '@core/server';
import { Express } from 'express';
import { Server } from 'http';
import { qureyWithOnlyIds, queryAllFields } from '@test-data/query-graphql-posts';
import { responseBodyIds, responseBodyWithAllFields } from '@test-data/response-graphql-posts';
import request from 'supertest';

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
            .send({ query: qureyWithOnlyIds })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err: any, res: any) => {
                if (err) return done(err);
                expect(res.body).toMatchObject(responseBodyIds);
                done()
            });
    });

    it('should return the all fields available on the graphql schema', (done) => {
        request(app)
            .post('/graphql')
            .send({ query: queryAllFields })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err: any, res: any) => {
                if (err) return done(err);
                expect(res.body).toMatchObject(responseBodyWithAllFields);
                done()
            });
    });

});