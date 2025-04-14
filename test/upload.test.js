import request from "supertest";
import { app } from "../src/app.js";
import path from 'path'


describe('POST /upload', function () {
    it('should upload a file successfully', (done)=>{
        request(app)
            .post('/api/pets/withimage')
            .attack('image', path.resolve(__dirname, '../src/public/img/1671549990926-coderDog.jpg'))
            .expect(200)
            .expect('Set-Cookie', /connect.sid/)
            .end((err, res )=>{
                if(err) return done(err)

                if(res.body.status !== 'success'){
                    return done( new Error('file upload failed'))

                }

                done()
            })
    })
    
})