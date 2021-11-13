const Sequelize = require('sequelize');
const sequelize = new Sequelize('obs', 'root', 'root', {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql',
    timezone: "+03:00",
    logging: true
});
const db = {};

db.User = require(__dirname + "/../models/User/User.js")(sequelize, Sequelize)
db.UserType = require(__dirname + "/../models/User/UserType.js")(sequelize, Sequelize)
db.Gender = require(__dirname + "/../models/Gender/Gender.js")(sequelize, Sequelize)
db.Class = require(__dirname + "/../models/Class/Class.js")(sequelize, Sequelize)
db.Homework = require(__dirname + "/../models/Homework/Homework.js")(sequelize, Sequelize)
db.HomeworkStudent = require(__dirname + "/../models/Homework/HomeworkStudent.js")(sequelize, Sequelize)

db.UserType.hasMany(db.User, { foreignKey: "user_type_id", onDelete: "restrict", onUpdate: "restrict" });
db.User.belongsTo(db.UserType, { foreignKey: "user_type_id", onDelete: "restrict", onUpdate: "restrict", });

db.Gender.hasMany(db.User, { foreignKey: "gender_id", onDelete: "restrict", onUpdate: "restrict" });
db.User.belongsTo(db.Gender, { foreignKey: "gender_id", onDelete: "restrict", onUpdate: "restrict", });

db.Class.hasMany(db.User, { foreignKey: "class_id", onDelete: "restrict", onUpdate: "restrict" });
db.User.belongsTo(db.Class, { foreignKey: "class_id", onDelete: "restrict", onUpdate: "restrict", });

db.Class.hasMany(db.Homework, { foreignKey: "class_id", onDelete: "restrict", onUpdate: "restrict" });
db.Homework.belongsTo(db.Class, { foreignKey: "class_id", onDelete: "restrict", onUpdate: "restrict", });

db.Homework.hasMany(db.HomeworkStudent, { foreignKey: "homework_id", onDelete: "restrict", onUpdate: "restrict" });
db.HomeworkStudent.belongsTo(db.Homework, { foreignKey: "homework_id", onDelete: "restrict", onUpdate: "restrict", });

db.User.hasMany(db.HomeworkStudent, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict" });
db.HomeworkStudent.belongsTo(db.User, { foreignKey: "user_id", onDelete: "restrict", onUpdate: "restrict", });

db.Sequelize = Sequelize;
db.sequelize = sequelize;



module.exports = db;
