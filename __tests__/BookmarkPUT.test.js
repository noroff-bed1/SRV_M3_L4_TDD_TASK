const app = require('../app');
const request = require('supertest');

it('Change a boookmark values', async () => {
	const userInformation = await request(app).post('/users/login').send({
		username: 'teacher007',
		password: 'asecret',
	});

	let token = JSON.parse(userInformation.text).data.token;
	const response = await request(app).put('/bookmarks/1').set('Authorization', `Bearer ${token}`).send({ Name: 'Updated name', URL: 'http://localhost:8080' });
	if (response.statuscode == 200) {
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('message', 'Bookmark changed successful');
	}
	if (response.statuscode == 404) {
		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty('error', 'Bookmark not found');
	}
	if (response.statuscode == 500) {
		expect(response.statusCode).toBe(500);
		expect(response.body).toHaveProperty('error');
	}
});

