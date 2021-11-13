module.exports = (sequelize, Sequelize) => {
	return sequelize.define('user', {
		user_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		password: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		user_type_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		ogr_no: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		gender_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		class_id: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		status: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 1
		}
	})
};
