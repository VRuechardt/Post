'use strict';

var request = require('supertest');
var app = require('../../server/app');
var expect = require('chai').expect;

describe('testing login and register functionality', function(){
    var agent = request.agent(app);
    it('cant access protected endpoints without beeing logged in', function(done){
        agent.get('/api/auth/check_login').expect(401).end(function(err, res){
           if(err)throw err;
            done();
        });
    });

    it('registering', function(done){
        agent.post('/api/auth/register').send({email: 'test@mail.de', password: 'password'})
            .expect(201)
            .end(function(err, res){
                if(err) throw err;
                var expectedAnswer = {id: 1, admin: false, email: 'test@mail.de'};
                expect(res.body).to.deep.equal(expectedAnswer);
                done();
        });
    });

    it('can access protected data while beeing logged in', function(done){
        agent.get('/api/auth/check_login').expect(200)
            .end(function(err, res){
                if(err) throw err;
                var expectedAnswer = {id: 1, admin: false, email: 'test@mail.de'};
                expect(res.body).to.deep.equal(expectedAnswer);
                done();
            });
    });

    it('checking logout functionality', function (done) {
        agent.get('/api/auth/check_login').expect(200).end(function(err, res){
            if(err) throw err;
            agent.get('/api/auth/logout').expect(200).end(function(err, res){
                if(err) throw err;
                agent.get('/api/auth/check_login').expect(401).end(function(err, res){
                    if(err) throw err;
                    done();
                });
            });
        });
    });

    it('cant create account with same email', function(done){
        agent.post('/api/auth/register').send({email: 'test@mail.de', password: 'password'})
            .expect(400)
            .end(function(err, res){
                if(err) throw err;
                done();
            });
    });

    it('trying to register without a valid email', function(done){
        agent.post('/api/auth/register').send({email: 'test', password: 'password'})
            .expect(400)
            .end(function(err, res){
                if(err) throw err;
                done();
            });
    });

    it('checking login with wrong credentials', function(done){
        agent.post('/api/auth/login')
            .send({email: 'test@mail.de', password: 'wrongpassword'})
            .expect(400)
            .end(function(err, res){
                if(err)throw err;
                done();
            });
    });

    it('checking login', function(done){
        agent.post('/api/auth/login')
            .send({email: 'test2@mail.de', password: 'password'})
            .expect(200)
            .end(function(err, res){
                if(err)throw err;
                done();
            });
    });
});