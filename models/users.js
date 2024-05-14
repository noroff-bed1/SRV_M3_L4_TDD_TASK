module.exports = (sequelize, Sequelize) => {
	const Users = sequelize.define('Users', {
			FirstName: Sequelize.DataTypes.STRING,
			LastName: Sequelize.DataTypes.STRING,
			Username: {
					type: Sequelize.DataTypes.STRING,
					allowNull: false,
					unique: true
			},
			EncryptedPassword: {
					type: Sequelize.DataTypes.BLOB,
					allowNull: false
			},
			Salt: {
					type: Sequelize.DataTypes.BLOB,
					allowNull: false
			},
	},{
			timestamps: false
	});
	Users.associate = function(models) {
		Users.hasMany(models.Bookmarks);
};
return Users
}