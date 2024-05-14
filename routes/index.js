var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', { title: 'Express' });
});

router.get('/signup', (req, res, next) => {
	res.render('signup', { title: 'Express' });
});

module.exports = router;

