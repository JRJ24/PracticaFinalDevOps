// Para correr los tests:
//  - npm test
//  - npx jest
//  - ./node_modules/.bin/jest
// Asegúrate de tener jest y supertest instalados (están en package.json según lo indicado).

const supertest = require('supertest');
const app = require('../src/app');

describe('App routes', () => {
    // it('GET / should return 200 and render index page', async () => {
    //     const response = await supertest(app).get('/');
    //     expect(response.statusCode).toBe(200);
    //     expect(response.text).toContain('<title>Home</title>');
    // });

    it('GET / should respond with Content-Type html', async () => {
        const response = await supertest(app).get('/');
        expect(response.statusCode).toBe(200);
        const contentType = response.headers['content-type'] || '';
        expect(contentType).toMatch(/html/);
    });

    // it('Unknown route should return 404', async () => {
    //     const response = await supertest(app).get('/this-route-does-not-exist');
    //     expect([404, 200]).toContain(response.statusCode); // allow 200 if app redirects unknowns to home
    //     if (response.statusCode === 404) {
    //         expect(response.text).toMatch(/Not Found|404/);
    //     }
    // });

    it('GET / should include a main heading or recognizable content', async () => {
        const response = await supertest(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(
            /<h1[^>]*>.*<\/h1>|<main[^>]*>.*<\/main>|<title>Home<\/title>/.test(response.text)
        ).toBe(true);
    });
});