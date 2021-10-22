const chai = require('chai');
chai.use(require('chai-http'));
const { expect } = require('chai');
const app = require('../index');
const agent = require('chai').request.agent(app);


describe('Ubereats Testing', () => {
  it('Authenticate Restaurant with Invalid Credentials: GET /signin', (done) => {
    agent.get('/login/restaurants?emailId=biryaniz@gmail.com&passwd=biryaniz@123')
      .then((response) => {
        expect(response.status).to.equal(403);
        expect(response.body.error).to.equal('Forbidden request!');
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('Register with an already registered mailId: POST /api/register/customers', (done) => {
    const data = {
        emailId: 'xyz@gmail.com',
        passwd: 'xyz123',
        name: 'xyz',
        contactNo: '13242342',
    };
    agent.post('/api/register/customers')
      .send(data)
      .then((response) => {
        expect(response.status).to.equal(409);
        expect(response.body.error).to.equal("There's already an account with this email. Please sign in.")
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('Get Restaurant Orders: GET api/restaurants/:restId/orders', (done) => {
    agent.get('/api/restaurants/1/orders')
      .then((response) => {
        expect(response.status).to.equal(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('Update Order status: PUT api/restaurants/:restId/orders', (done) => {
    const data = {
        orderStatus:"Placed",
        orderId:10
    };
    agent.put('/api/restaurants/4/orders')
      .send(data)
      .then((response) => {
        expect(response.body.message).to.equal('Order status updated!');
        expect(response.status).to.equal(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('Update dish price to 11$: Put /api/restaurants/4/dishes/11', (done) => {
    const data = {
      name: 'Biryani',
      dishPrice: 11,
      category:"Main Course"
    };
    agent.put('/api/restaurants/4/dishes/11')
      .send(data)
      .then((response) => {
        expect(response.status).to.equal(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});