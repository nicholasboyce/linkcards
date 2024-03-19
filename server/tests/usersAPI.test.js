const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../src/models/user');
const userService = require('../src/services/userService');


describe('when there are no users initially saved', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    test('login fails as unauthorized without prior user creation', async () => {
        await api
            .post('/api/login')
            .send({
                username: 'sarah1',
                password: 'abc123'
            })
            .expect(401);
    });

    test('new user creation succeeds with valid input', async () => {
        await api
            .post('/api/users')
            .send({
                username: 'sarah1',
                password: 'abc123'
            })
            .expect(201);
    });

    test('user creation fails as bad request with invalid input', async () => {
        await api
            .post('/api/users')
            .send({
                username: 'sarah1'
            })
            .expect(400);
            
        await api
            .post('/api/users')
            .send({
                password: 'abc123'
            })
            .expect(400);

        await api
            .post('/api/users')
            .send({
                username: 'sa',
                password: 'abc123'
            })
            .expect(400);
        
        await api
            .post('/api/users')
            .send({
                username: 'sarah1',
                password: 'ab'
            })
            .expect(400);
    });
});

describe('when there are users initially saved', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await userService.createUser({
            username: 'sarah1',
            password: 'abc123'
        });
    });

    test('login succeeds with valid credentials', async () => {
        const credentials = {
            username: 'sarah1',
            password: 'abc123'
        }

        await api
            .post('/api/login')
            .send(credentials)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('login fails as unauthorized with invalid credentials', async () => {
        const badPassword = {
            username: 'sarah1',
            password: 'abc122'
        }

        await api
            .post('/api/login')
            .send(badPassword)
            .expect(401)
            .expect('Content-Type', /application\/json/);

        const badUsername = {
            username: 'sarah2',
            password: 'abc123'
        }
    
        await api
            .post('/api/login')
            .send(badUsername)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });

    test('new user creation succeeds when username is unique', async () => {
        const credentials = {
            username: 'sarah2',
            password: 'abc123'
        }

        await api
            .post('/api/users')
            .send(credentials)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('new user creation fails when username is not unique', async () => {
        const badCredentials = {
            username: 'sarah1',
            password: 'abc123'
        }

        await api
            .post('/api/users')
            .send(badCredentials)
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

after(async () => {
    await mongoose.connection.close();
});