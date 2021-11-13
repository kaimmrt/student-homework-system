module.exports = (sequelize, Sequelize) => {
    return sequelize.define('homework_student', {
        homework_student_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        homework_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        file: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        user_id: {
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
