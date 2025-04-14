import chai from 'chai';
import request from 'supertest';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';

const expect = chai.expect;

describe('Adoption Routes', function() {

  this.timeout(5000);

  let testUser;
  let testPet;
  let testAdoption;


before(async function () {
  const res = await request(app).get('/api/users/67d5954b1b00a1d5d4483b1d')

  if (res.status !== 201 && res.status !== 200) {
    console.error('❌ Error bucando el usuario:', res.body);
    throw new Error('No se pudo encontrar el usuario de prueba');
  }

  testUser = res.body.payload;
});


  after(async () => {
    await mongoose.connection.close();
  });

  it('GET /api/adoptions → debería devolver todas las adopciones', async () => {
    const res = await request(app).get('/api/adoptions');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body.payload).to.be.an('array');
  });

  it('POST /api/adoptions/:uid/:pid → debería crear una adopción', async () => {
    const res = await request(app)
      .post(`/api/adoptions/${testUser._id}/67d5954b1b00a1d5d4483b3a`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body).to.have.property('message', 'Pet adopted');
  });

  it('GET /api/adoptions/:aid → debería obtener una adopción específica', async () => {
    // Obtener adopción
    const adoptions = await request(app).get('/api/adoptions');
    testAdoption = adoptions.body.payload.find(a => a.owner === testUser._id);

    const res = await request(app).get(`/api/adoptions/${testAdoption._id}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'success');
    expect(res.body.payload).to.have.property('_id', testAdoption._id);
  });
});
