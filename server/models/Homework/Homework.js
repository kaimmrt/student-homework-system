module.exports = (sequelize, Sequelize) => {
    return sequelize.define('homework', {
        homework_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        file: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        class_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    })
};
