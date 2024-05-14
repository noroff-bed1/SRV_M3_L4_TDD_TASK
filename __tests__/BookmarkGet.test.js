const app = require('../app');
const request = require('supertest');

it('Get a Bookmark from Id', async () => {
	const userInformation = await request(app).post('/users/login').send({
		username: 'teacher007',
		password: 'asecret',
	});

	let token = JSON.parse(userInformation.text).data.token;
	const response = await request(app).get('/bookmarks/1').set('Authorization', `Bearer ${token}`).send();
	if (response.statuscode == 200) {
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('bookmark.id', '1');
		expect(response.body).toHaveProperty('bookmark.Name');
		expect(response.body).toHaveProperty('bookmark.url');
		expect(response.body).toHaveProperty('bookmark.UserId');
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



