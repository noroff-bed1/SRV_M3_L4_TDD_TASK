const { Op } = require('sequelize');

class UserService {
	constructor(db) {
		this.client = db.sequelize;
		this.Users = db.Users;
	}

	async create(firstname, lastname, username, salt, encryptedPassword) {
			 return await this.Users.create({
				FirstName: firstname,
				LastName: lastname,
				Username: username,
				Salt: salt,
				EncryptedPassword: encryptedPassword,
			})
}

	async getOne(username) {
		return await this.Users.findOne({
			where: { username: username },
		});
	}
}
module.exports = UserService;

