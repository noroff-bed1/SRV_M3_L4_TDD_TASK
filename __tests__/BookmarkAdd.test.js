const app = require('../app');
const request = require('supertest');

it('Add a bookmark for a logged in user.', async () => {
	const userInformation = await request(app).post('/users/login').send({
		username: 'teacher007',
		password: 'asecret',
	});

	let token = JSON.parse(userInformation.text).data.token;
	const response = await request(app).post('/bookmarks').set('Authorization', `Bearer ${token}`).send({ Name: 'New Bookmark', URL: 'http://localhost:3000' });
	expect(response.statusCode).toBe(200);
	expect(response.body).toHaveProperty('message', 'Bookmark created successfully');
});

