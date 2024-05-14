module.exports = (sequelize, Sequelize) => {
	const Bookmarks = sequelize.define('Bookmarks', {
		Name: Sequelize.DataTypes.STRING,
		url: Sequelize.DataTypes.STRING
	},{
			timestamps: false
	});

return Bookmarks
}