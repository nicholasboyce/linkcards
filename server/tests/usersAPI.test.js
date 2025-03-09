const { test, after, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const browser = supertest.agent(app);
const User = require('../src/models/user');
const userService = require('../src/services/userService');


describe('when there are no users initially saved', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    test('login fails as unauthorized without prior user creation', async () => {
        const csrfResponse = await browser
            .get('/api/csrf')
            .expect(200);

        const csrfToken = { 'x-csrf-token': csrfResponse.body.token }

        await browser
            .post('/api/login')
            .set(csrfToken)
            .send({
                username: 'sarah1',
                password: 'abc123'
            })
            .expect(401);
    });

    test('new user creation succeeds with valid input', async () => {
        const csrfResponse = await browser
            .get('/api/csrf')
            .expect(200);

        const csrfToken = { 'x-csrf-token': csrfResponse.body.token }

        await browser
            .post('/api/users')
            .set(csrfToken)
            .send({
                username: 'sarah1',
                password: 'abc123'
            })
            .expect(201);
    });

    describe('user creation fails as bad request', () => {
        //break up into smaller tests
        test('without password provided', async () => {
            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);

            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }

            await browser
                .post('/api/users')
                .set(csrfToken)
                .send({
                    username: 'sarah1'
                })
                .expect(400);
        });
        
            
        test('without username provided', async () => {
            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);

            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }

            await browser
                .post('/api/users')
                .set(csrfToken)
                .send({
                    password: 'abc123'
                })
                .expect(400);
        });
        

        test('with too short username', async () => {
            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);

            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }

            await browser
                .post('/api/users')
                .set(csrfToken)
                .send({
                    username: 'sa',
                    password: 'abc123'
                })
                .expect(400);
        });
        
        
        test('with too short password', async () => {
            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);

            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }

            await browser
                .post('/api/users')
                .set(csrfToken)
                .send({
                    username: 'sarah1',
                    password: 'ab'
                })
                .expect(400)});
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

        const csrfResponse = await browser
            .get('/api/csrf')
            .expect(200);

        const csrfToken = { 'x-csrf-token': csrfResponse.body.token }

        await browser
            .post('/api/login')
            .set(csrfToken)
            .send(credentials)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('login fails as unauthorized with invalid credentials', async () => {
        const badPassword = {
            username: 'sarah1',
            password: 'abc122'
        }

        const csrfResponse = await browser
            .get('/api/csrf')
            .expect(200);

        const csrfToken = { 'x-csrf-token': csrfResponse.body.token }

        await browser
            .post('/api/login')
            .set(csrfToken)
            .send(badPassword)
            .expect(401);

        const badUsername = {
            username: 'sarah2',
            password: 'abc123'
        }

        const secondCsrfResponse = await browser
            .get('/api/csrf')
            .expect(200);

        const secondCsrfToken = { 'x-csrf-token': secondCsrfResponse.body.token }
    
        await browser
            .post('/api/login')
            .set(secondCsrfToken)
            .send(badUsername)
            .expect(401);
    });

    describe('new user creation', () => {
        test('succeeds when username is unique', async () => {
            const credentials = {
                username: 'sarah2',
                password: 'abc123'
            }

            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);

            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }
    
            await browser
                .post('/api/users')
                .set(csrfToken)
                .send(credentials)
                .expect(201)
                .expect('Content-Type', /application\/json/);
        });
    
        test('succeeds with userInfo provided', async () => {
            const data = {
                info: {
                  name: 'Jessica Randall',
                  location: 'London, United Kingdom',
                  bio: '"Front-end developer and avid reader."'
                },
                links: [
                  {
                    name: 'Github',
                    url: 'https://www.nicholasboyce.dev'
                  },
                  {
                    name: 'Frontend Mentor',
                    url: 'https://www.nicholasboyce.dev'
                  },
                  {
                    name: 'Linkedin',
                    url: 'https://www.nicholasboyce.dev'
                  },
                  {
                    name: 'Twitter',
                    url: 'https://www.nicholasboyce.dev'
                  },
                  {
                    name: 'Instagram',
                    url: 'https://www.nicholasboyce.dev'
                  }
                ]
            }
    
            const credentials = {
                username: 'jessica1',
                password: 'abc123',
                data
            }

            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);

            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }
            
            await browser
                .post('/api/users')
                .set(csrfToken)
                .send(credentials)
                .expect(201)
                .expect('Content-Type', /application\/json/);
    
            const response = await api
                .get('/api/users/jessica1')
                .expect(200)
                .expect('Content-Type', /application\/json/);
    
            assert.deepStrictEqual(response.body.data.info, data.info);
            assert.equal(data.links.length, response.body.data.links.length);
        });
    
        test('fails when username is not unique', async () => {
            const badCredentials = {
                username: 'sarah1',
                password: 'abc123'
            }

            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);

            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }
    
            await browser
                .post('/api/users')
                .set(csrfToken)
                .send(badCredentials)
                .expect(400)
                .expect('Content-Type', /application\/json/);
        });
    });

    test('user data is returned when user-specific page is requested', async () => {
        const response = await api
            .get('/api/users/sarah1')
            .expect(200);

        assert.strictEqual(response.body.username, 'sarah1');
    });

    describe('updating an existing user\'s information', () => {

        test('returns updated user upon success', async () => {

            const credentials = {
                username: 'sarah1',
                password: 'abc123'
            }

            const csrfResponse = await browser
            .get('/api/csrf')
            .expect(200);

            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }
    
            await browser
                .post('/api/login')
                .set(csrfToken)
                .send(credentials)
                .expect(200)
                .expect('Content-Type', /application\/json/);
    

            const newUserData = {
                data: {
                    info: {
                        bio: 'I\'m a really good swimmer'
                    },
                    links: [
                        {
                            name: 'Github',
                            url: 'https://www.github.com/sarahsarahbarah'
                        }
                    ]
                }
            }

            await browser
                .get('/api/users/sarah1')
                .expect(200);

            const secondCsrfResponse = await browser
                .get('/api/csrf')
                .expect(200);
    
            const secondCsrfToken = { 'x-csrf-token': secondCsrfResponse.body.token }

            const patchResponse = await browser
                .patch('/api/users/sarah1')
                .set(secondCsrfToken)
                .send(newUserData)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            assert.deepStrictEqual(patchResponse.body.data.links.length, newUserData.data.links.length);
        });

        test('fails if user is non-existent', async () => {
            const credentials = {
                username: 'sarah1',
                password: 'abc123'
            }

            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);

            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }
    
            await browser
                .post('/api/login')
                .set(csrfToken)
                .send(credentials)
                .expect(200)
                .expect('Content-Type', /application\/json/);
    

            const newUserData = {
                data: {
                    info: {
                        bio: 'I\'m a really good swimmer'
                    },
                    links: [
                        {
                            name: 'Github',
                            url: 'https://www.github.com/sarahsarahbarah'
                        }
                    ]
                }
            }

            const secondCsrfResponse = await browser
                .get('/api/csrf')
                .expect(200);
    
            const secondCsrfToken = { 'x-csrf-token': secondCsrfResponse.body.token }

            await browser
                .patch('/api/users/sarah2')
                .set(secondCsrfToken)
                .send(newUserData)
                .expect(401)
                .expect('Content-Type', /application\/json/);

        });

        test('fails if agent is not logged in', async () => {
            await userService.createUser({
                username: 'sarah2',
                password: 'abc123'
            });

            const newUserData = {
                data: {
                    info: {
                        bio: 'I\'m a really good swimmer'
                    },
                    links: [
                        {
                            name: 'Github',
                            url: 'https://www.github.com/sarahsarahbarah'
                        }
                    ]
                }
            }

            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);
    
            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }

            await browser
                .patch('/api/users/sarah2')
                .set(csrfToken)
                .send(newUserData)
                .expect(401)
                .expect('Content-Type', /application\/json/);
        });

        test('fails if agent is not authorized to change target info', async () => {
            await userService.createUser({
                username: 'sarah2',
                password: 'abc123'
            });

            const credentials = {
                username: 'sarah1',
                password: 'abc123'
            }

            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);
    
            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }
    
            await browser
                .post('/api/login')
                .set(csrfToken)
                .send(credentials)
                .expect(200)
                .expect('Content-Type', /application\/json/);
    

            const newUserData = {
                data: {
                    info: {
                        bio: 'I\'m a really good swimmer'
                    },
                    links: [
                        {
                            name: 'Github',
                            url: 'https://www.github.com/sarahsarahbarah'
                        }
                    ]
                }
            }

            const secondCsrfResponse = await browser
                .get('/api/csrf')
                .expect(200);
    
            const secondCsrfToken = { 'x-csrf-token': secondCsrfResponse.body.token }

            await browser
                .patch('/api/users/sarah2')
                .set(secondCsrfToken)
                .send(newUserData)
                .expect(401)
                .expect('Content-Type', /application\/json/);

        });

        test('doesn\'t change target if update info is not valid', async () => {
            const credentials = {
                username: 'sarah1',
                password: 'abc123'
            }

            const csrfResponse = await browser
                .get('/api/csrf')
                .expect(200);
    
            const csrfToken = { 'x-csrf-token': csrfResponse.body.token }
    
            await browser
                .post('/api/login')
                .set(csrfToken)
                .send(credentials)
                .expect(200)
                .expect('Content-Type', /application\/json/);
    

            const newUserData = {
                data: 3
            }

            const firstGet = await browser
                .get('/api/users/sarah1')
                .expect(200)
                .expect('Content-Type', /application\/json/);
                
            const secondCsrfResponse = await browser
                .get('/api/csrf')
                .expect(200);
    
            const secondCsrfToken = { 'x-csrf-token': secondCsrfResponse.body.token }

            await browser
                .patch('/api/users/sarah1')
                .set(secondCsrfToken)
                .send(newUserData)
                .expect(400)
                .expect('Content-Type', /application\/json/);

            const secondGet = await browser
                .get('/api/users/sarah1')
                .expect(200)
                .expect('Content-Type', /application\/json/);

            assert.deepStrictEqual(firstGet.body, secondGet.body);
        });
    });
});

after(async () => {
    await mongoose.connection.close();
});