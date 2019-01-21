process.env.NODE_ENV = 'test';
import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { random, createPlan, createUser } from '../utils/tests.helpers';

chai.use(chaiHttp);
const expect = chai.expect;

describe('/plans', () => {
  describe('POST /', () => {
    it('returns error for missing fields', (done) => {
      chai.request(server)
        .post('/api/v1/plans')
        .set('content-type', 'application/json')
        .send({})
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('type');
          done();
        });
    });

    it('requires start and end date for time based plan', (done) => {
      const body = {
        name: `Plan ${random()}`,
        type: 'TIME_BASED'
      };

      chai.request(server)
        .post('/api/v1/plans')
        .set('content-type', 'application/json')
        .send(body)
        .end((err, res) => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('startDate');
          expect(res.body).to.have.property('endDate');
          expect(res.body.startDate).to.equal('Please provide a start date');
          expect(res.body.endDate).to.equal('Please provide an end date');
          done();
        });
    });

    it('creates a recurrent plan', (done) => {
      const body = {
        name: `Plan ${random()}`,
        type: 'RECURRENT'
      };

      chai.request(server)
        .post('/api/v1/plans')
        .set('content-type', 'application/json')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.name).to.equal(body.name);
          expect(res.body.type).to.equal(body.type);
          expect(res.body).to.have.property('users');
          done();
        });
    });

    it('creates a time-based plan', (done) => {
      const body = {
        name: `Plan ${random()}`,
        type: 'TIME_BASED',
        startDate: new Date(),
        endDate: new Date()
      };

      chai.request(server)
        .post('/api/v1/plans')
        .set('content-type', 'application/json')
        .send(body)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.name).to.equal(body.name);
          expect(res.body.type).to.equal(body.type);
          expect(res.body).to.have.property('users');
          expect(res.body).to.have.property('startDate');
          expect(res.body).to.have.property('endDate');
          done();
        });
    });
  });

  describe('GET /', () => {
    it('gets all plans', (done) => {
      chai.request(server)
        .get('/api/v1/plans')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });

  describe('GET /:id', () => {
    it('gets all users for a plan', async () => {
      const plan = await createPlan();
      chai.request(server)
        .get(`/api/v1/plans/${plan._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
        });
    });
  });

  describe('POST /:id/add/:userId', () => {
    it('adds a user to a plan', async () => {
      const plan = await createPlan();
      const user = await createUser();
      const url = `/api/v1/plans/${plan._id}/add/${user._id}`;
      chai.request(server)
        .post(url)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to
            .equal(`User successfully added to the ${plan.name} plan`);
        });
    });
  });
});