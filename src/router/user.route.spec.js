import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import { random, createPlan, createUser } from '../utils/tests.helpers';

chai.use(chaiHttp);
const expect = chai.expect;

describe('/users', () => {
  describe('POST /', () => {
    it('creates a user', (done) => {
      const user = {
        firstName: 'Test',
        lastName: 'User',
        dob: new Date(),
        email: `test${random()}@email.com`
      };
      chai.request(server)
        .post('/api/v1/users')
        .set('content-type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.firstName).to.equal(user.firstName);
          expect(res.body.lastName).to.equal(user.lastName);
          expect(res.body.email).to.equal(user.email);
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('returns error for missing fields', (done) => {
      const user = {
        firstName: 'Test',
        lastName: 'User'
      };
      chai.request(server)
        .post('/api/v1/users')
        .set('content-type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.dob).to.equal('Please provide a valid date of birth');
          expect(res.body.email).to.equal('Please provide a valid email');
          done();
        });
    });
  });

  describe('GET /', () => {
    it('gets all users', (done) => {
      chai.request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });

  describe('GET /:id', () => {
    it('gets a user by ID', async () => {
      const user = await createUser()
      chai.request(server)
        .get(`/api/v1/users/${user._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.firstName).to.equal(user.firstName);
          expect(res.body.lastName).to.equal(user.lastName);
          expect(res.body.email).to.equal(user.email);
          expect(res.body).to.have.property('_id');
        });
    });
  });

  describe('PUT /:id', () => {
    it('edits a user details', async () => {
      const user = await createUser();
      const newUser = {
        firstName: 'Test 89',
        lastName: 'Updated'
      }
      chai.request(server)
        .put(`/api/v1/users/${user._id}`)
        .set('content-type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.firstName).to.not.equal(user.firstName);
          expect(res.body.lastName).to.not.equal(user.lastName);
          expect(res.body.firstName).to.equal(newUser.firstName);
          expect(res.body.lastName).to.equal(newUser.lastName);
        });
    });
  });

  describe('DELETE /:id', () => {
    it('deletes a user with a valid id', async () => {
      const user = await createUser();
      chai.request(server)
        .delete(`/api/v1/users/${user._id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Resource deleted successfully');
        });
    });
  });
});