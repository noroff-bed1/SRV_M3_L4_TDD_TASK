const { Op } = require('sequelize');

class BookmarkService {
	constructor(db) {
		this.client = db.sequelize;
		this.Bookmarks = db.Bookmarks;
	}

	async create(Name, URL, UserId) {
		return this.Bookmarks.create({
			Name: Name,
			url: URL,
			UserId: UserId,
		});
	}
		async getUsersBookmarks(userId) {
		return await this.Bookmarks.findAll({
			where: { UserId: userId },
		});
	}
	async updateBookmarkFromId(userId,bookmarkId, name, url){
		return await this.client.query(`UPDATE bookmarks  SET Name = '${name}',url = '${url}' WHERE UserId = ${userId} AND id = ${bookmarkId}`)

	}

	async getUsersBookmarkFromBookmarkId(userId, BookmarkId) {
		return await this.Bookmarks.findOne({
			where: { UserId: userId, id: BookmarkId },
		});
	}
}
module.exports = BookmarkService;

