import request from "supertest";
import {app }from "../src/app.js";

describe('GET /pets', function(done) {
    it('should return a list of pets in JSON  format with a success status', ()=>{
        request(app)
            .get('/api/pets')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res )=>{
                if(err) return done(err)

                if(res.body.status !== 'success'){
                    return done( new Error('Expected status to be success'))

                }
                
                if(!Array.isArray(res.body.payload)){
                    return done(new Error('Expected payload to be an array of pets'))
                }

                done()
            })
    })
    
})



// import request from "supertest";
// import { expect } from "chai";
// import {app} from "../src/app.js"; // Asegúrate de importar correctamente tu app

// describe("GET /pets", function () {
//   it("should return a list of pets in JSON format with a success status", async function () {
//     const res = await request(app).get("/api/pets");

//     expect(res.status).to.equal(200);
//     expect(res.body.payload).to.be.an("array");
//   });
// });