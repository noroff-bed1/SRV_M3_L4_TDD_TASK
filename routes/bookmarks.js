var express = require('express');
var router = express.Router();
const { isAuth } = require('../middleware/isAuth');
const db = require('../models');
const BookmarkService = require('../services/BookmarkService');
const bookmarkService = new BookmarkService(db);

/* GET home page. */
router.get('/', isAuth, async (req, res, next) => {
	let bookmarks = await bookmarkService.getUsersBookmarks(req.user.id);
	res.render('bookmarks', { title: 'Express', bookmarks: bookmarks });
});

router.get('/:id', isAuth, (req, res, next) => {
	try{
		bookmarkService.getUsersBookmarkFromBookmarkId(req.user.id, req.params.id).then((bookmark) => {
			if (bookmark == null){
				res.status(404).json({error: 'Bookmark not found'})
			}else{
				res.status(200).json({bookmark})
			}
		})
	}catch(err){
		res.status(500).json({error: err.message})

	}
});

router.put('/:id', isAuth, (req,res,next) => {
try {
	const {Name, URL} = req.body
	bookmarkService.updateBookmarkFromId(req.user.id, req.params.id,Name, URL).then((result) => {
		if(result.length > 0){
			if (result[0].affectedRows != 0){

		res.status(200).send({message:"Bookmark changed successful"})
			}else{

		res.status(200).send({message:"Bookmark not found"})
			}

		}
	}).catch(err=>{
		res.status(500).send({error: err.message})
	})
} catch (err) {
	res.status(500).json({error: err.message})
}
})

router.post('/', isAuth, async (req, res, next) => {
	try {
		const { Name, URL } = req.body;

		bookmarkService.create(Name, URL, req.user.id).then((bookmark) => {
			res.status(200).send({message: 'Bookmark created successfully'})
		});

	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;

