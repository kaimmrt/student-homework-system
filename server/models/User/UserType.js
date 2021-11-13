module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_type', {
        user_type_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
};
