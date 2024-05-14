const app = require('../app');
const request = require('supertest');

it('User Logged in test', async () => {
	const response = await request(app).post('/users/login').send({
		username: 'teacher007',
		password: 'asecret',
	});

	expect(response.statusCode).toBe(200);
	expect(response.body).toHaveProperty('message', 'User logged in successfully');
	expect(response.body).toHaveProperty('data.token');
	expect(response.body).toHaveProperty('data.username');
});





