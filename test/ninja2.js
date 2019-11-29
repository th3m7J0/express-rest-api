
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");


//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let app=require("../app/app");
let should = chai.should();
chai.use(chaiHttp);

//Our parent block
describe('Ninjas CRUD',function () {
    var allNinjas = [];
    var ninjas = [{
        name: 'youcef',
        rank: 'dev web',
        available: false,
        geometry: {
            type: 'Point',
            coordinates: [-80, 25.791]
        }
    }, {
        name: 'alaa',
        rank: 'ro',
        available: true,
        geometry: {
            coordinates: [-82, 26.491]
        }
    },
        {
            name: 'ouss',
            rank: 'bdd',
            available: true,
            geometry: {
                coordinates: [-80, 27.491]
            }
    }]

    describe('POST /api/ninjas',()=>{

        it('should add & return status 200',function (done) {
            chai.request(app)
                .post('/api/ninjas')
                .send(ninjas[2])
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })

        it('should not add & return status 500',function (done) {
            chai.request(app)
                .post('/api/ninjas')
                .send(ninjas[4])
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                })
        })
        it('should add & have default type Point and coordiantes\'s length equal 2',function (done) {
            chai.request(app)
                .post('/api/ninjas')
                .send(ninjas[1])
                .end((err, res) => {
                    res.body.geometry.coordinates.length.should.be.eql(2);
                    res.body.geometry.type.should.eql('Point');
                    done();
                })
        })
    })

    describe('GET /api/ninjas',()=>{
        it('should get & return status 200',function (done) {
            chai.request(app)
                .get('/api/ninjas')
                .send({})
                .end((err, res) => {
                    res.should.have.status(200);
                    allNinjas = res.body;
                    done();
                })
        })

        it('should get & have content type array',function (done) {
            chai.request(app)
                .get('/api/ninjas')
                .send({})
                .end((err, res) => {
                    res.body.should.be.a('array');
                    done();
                })
        })
    })


    describe('PUT /api/ninjas/:id',()=>{
        it('should update & return status 200',function (done) {
            chai.request(app)
                .put('/api/ninjas/'+allNinjas[0]._id)
                .send(ninjas[1])
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    done();
                })
        })

    })

    describe('DELETE /api/ninjas/:id',()=>{
        it('should delete & return status 200',function (done) {
            chai.request(app)
                .delete('/api/ninjas/'+allNinjas[0]._id)
                .send({})
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    done();
                })
        })
    })

    //run once after all tests
    after(function (done) {
        console.log('Deleting test database');
        mongoose.connection.db.dropDatabase(done);
    });

})







