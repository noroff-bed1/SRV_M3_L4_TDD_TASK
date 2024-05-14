var express = require('express');
var router = express.Router();
var crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('../models');
const UserService = require('../services/UserService');
const userService = new UserService(db);

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});



router.post('/', async (req, res, next) => {
	const { firstname, lastname, username, password } = req.body;
	try {
		var salt = crypto.randomBytes(16);
		crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
			if (err) {
				return next(err);
			}
			userService.create(firstname, lastname, username, salt, hashedPassword).then(result => {
				let token = EncodeJWT(result.dataValues.id, result.dataValues.Username);
				res.status(200).json({ message: 'User created successfully', data: { token: token } });
			}).catch(error => {
				if (error.name == 'SequelizeUniqueConstraintError') res.status(500).json({error: 'Username already used'})

			})
			// console.log("🚀 ~ result:", result)
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post('/login', (req, res, next) => {
	try {
		const { username, password } = req.body;
		userService.getOne(username).then((dbUser) => {
			if (dbUser == null) return res.status(404).json({ error: 'User not found or password incorrect' });

			crypto.pbkdf2(password, dbUser.dataValues.Salt, 310000, 32, 'sha256', function (err, hashedPassword) {
				if (err) {
					return cb(err);
				}
				if (!crypto.timingSafeEqual(dbUser.dataValues.EncryptedPassword, hashedPassword)) {
					return res.status(401).send({ result: 'Incorrect email or password' });
				}
				let token;
				try {
					token = jwt.sign({ id: dbUser.dataValues.id, username: dbUser.dataValues.Username }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
				} catch (err) {
					return res.status(400).send({
						result: 'Something went wrong when creating JWT token',
					});
				}
				return res.status(200).send({
					message: 'User logged in successfully',
					data: {
						token: token,
						username: dbUser.dataValues.Username,
					},
				});
			});
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

const EncodeJWT = (id, username) => {
	try {
		token = jwt.sign({ id: id, username: username }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
		return token;
	} catch (err) {
		return res.jsend.error({
			statusCode: 400,
			result: 'Something went wrong when creating JWT token',
		});
	}
};

module.exports = router;

