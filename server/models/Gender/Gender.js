module.exports = (sequelize, Sequelize) => {
    return sequelize.define('gender', {
        gender_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
};
