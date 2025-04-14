// import request from "supertest";
// import { app } from "../src/app.js";


// describe('POST /login', function (done) {
//     it('should login successfully and set a session cookie', ()=>{
//         request(app)
//             .post('/api/sessions/login')
//             .send({email: 'examplefromtest@test.com', password: 'testpass'})
//             .expect(200)
//             .expect('Set-Cookie', /connect.sid/)
//             .expect('Content-Type', /json/)
//             .end((err, res )=>{
//                 if(err) return done(err)

//                 if(res.body.status !== 'success'){
//                     return done( new Error('Expected status to be success'))

//                 }

//                 done()
//             })
//     })
    
// })


import request from "supertest";
import { expect } from "chai";
import { app } from "../src/app.js";

describe('POST /login', function(){

    this.timeout(5000);

    it('should login successfully and set a session cookie', async function () {
        const res = await request(app)
            .post('/api/sessions/login')
            .send({ email: 'Ivah.Stehr47@hotmail.com', password: 'coder123' });

        expect(res.status).to.equal(200);
        expect(res.headers['set-cookie']).to.not.be.undefined;
        expect(res.headers['content-type']).to.match(/json/);
        expect(res.body.status).to.equal('success');
    });
});
