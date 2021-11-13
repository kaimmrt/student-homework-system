module.exports = (sequelize, Sequelize) => {
    return sequelize.define('class', {
        class_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        class_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    })
};
