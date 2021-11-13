const express = require('express');
const router = express.Router();

// Models
const { Class, Homework, HomeworkStudent, User } = require('../helper/db');


router.post("/send-data", async (req, res) => {
    try {
        const { user_type_id } = req.decoded
        const { file, class_id } = req.body

        if (user_type_id != 2) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const students = await User.findAll({
                where: { class_id, user_type_id: 3, status: 1 }
            })

            const homework = await Homework.create({
                class_id,
                file
            })

            for (const value of students) {
                await HomeworkStudent.create({
                    homework_id: homework.homework_id,
                    user_id: value.user_id
                })
            }

        }

        res.send("")

    } catch (e) {
        res.status(500);
        res.json('');
    }
})

router.post("/previous-homework", async (req, res) => {
    try {
        const { user_type_id } = req.decoded
        const { class_id } = req.body

        if (user_type_id == 1) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await Homework.findAll({
                where: { class_id }
            })
            res.send(data)
        }


    } catch (e) {
        res.status(500);
        res.json('');
        console.log(e)
    }
})

router.post("/homework", async (req, res) => {
    try {
        const { user_type_id } = req.decoded
        const { homework_id } = req.body

        const data = await Homework.findOne({
            where: { homework_id, status: 1 }
        })
        res.send(data)

    } catch (e) {
        res.status(500);
        res.json('');
        console.log(e)
    }
})

router.post("/homework-student/send-data", async (req, res) => {
    try {
        const { user_type_id, user_id } = req.decoded
        const { homework_id, file } = req.body

        if (user_type_id != 3) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            await HomeworkStudent.update({
                file
            }, { where: { homework_id, user_id, status: 1 } })
        }

        res.send("")

    } catch (e) {
        res.status(500);
        res.json('');
        console.log(e)
    }
})

router.post("/homework-student", async (req, res) => {
    try {
        const { user_type_id, user_id } = req.decoded
        const { homework_id } = req.body


        const data = await HomeworkStudent.findOne({
            where: { homework_id, user_id, status: 1 },
        })

        res.send(data)

    } catch (e) {
        res.status(500);
        res.json('');
        console.log(e)
    }
})

router.post("/student-homeworks", async (req, res) => {
    try {
        const { user_type_id } = req.decoded
        const { user_id } = req.body


        if (user_type_id == 3) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await HomeworkStudent.findAll({
                where: { user_id, status: 1 },
            })

            res.send(data)
        }


    } catch (e) {
        res.status(500);
        res.json('');
        console.log(e)
    }
})
module.exports = router;