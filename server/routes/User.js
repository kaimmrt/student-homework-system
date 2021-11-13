const express = require('express');
const router = express.Router();

// Models
const { User, Class, UserType } = require('../helper/db');


router.post("/teacher-list", async (req, res) => {
    try {
        const { user_type_id } = req.decoded

        if (user_type_id != 1) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await User.findAll({
                where: { user_type_id: 2, status: 1 },
                include: Class
            })
            res.send(data)
        }


    } catch (e) {
        res.status(500);
        console.log(e)
        res.json('');
    }
})

router.post("/teacher-without-classlist", async (req, res) => {
    try {
        const { user_type_id } = req.decoded

        if (user_type_id != 1) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await User.findAll({
                where: { user_type_id: 2, class_id: null, status: 1 },
                include: Class
            })
            res.send(data)
        }


    } catch (e) {
        res.status(500);
        console.log(e)
        res.json('');
    }
})

router.post("/", async (req, res) => {
    try {
        const { user_type_id } = req.decoded
        const { user_id } = req.body

        if (user_type_id != 1) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await User.findOne({
                where: { status: 1, user_id, },
                include: [{ model: Class }, { model: UserType }]
            })
            res.send(data)
        }

    } catch (e) {
        res.status(500);
        res.json('');
        console.log(e)
    }
})

router.post("/student", async (req, res) => {
    try {
        const { user_type_id } = req.decoded
        const { user_id } = req.body

        if (user_type_id == 3) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await User.findOne({
                where: { status: 1, user_id, },
                include: [{ model: Class }, { model: UserType }]
            })
            res.send(data)
        }

    } catch (e) {
        res.status(500);
        res.json('');
        console.log(e)
    }
})

router.post("/update-user-class", async (req, res) => {
    try {
        const { user_type_id } = req.decoded
        const { user_id, class_id } = req.body

        let teacher = await User.findOne({ where: { user_id } })

        if (!teacher) {
            res.status(404).json({
                message: "Does Not exist a teacher with id = " + user_id,
                error: "404",
            });
        }
        if (user_type_id != 1) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            await User.update({
                class_id
            }, { where: { user_id } });
            res.status(200);
        }

        res.send("")
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.log(error)
        res.send("")
    }
})

router.post("/student-list", async (req, res) => {
    try {
        const { user_type_id } = req.decoded

        if (user_type_id != 1) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await User.findAll({
                where: { user_type_id: 3, status: 1 },
                include: Class
            })
            res.send(data)
        }


    } catch (e) {
        res.status(500);
        console.log(e)
        res.json('');
    }
})

router.post("/student-without-classlist", async (req, res) => {
    try {
        const { user_type_id } = req.decoded

        if (user_type_id != 1) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await User.findAll({
                where: { user_type_id: 3, class_id: null, status: 1 },
                include: Class
            })
            res.send(data)
        }


    } catch (e) {
        res.status(500);
        console.log(e)
        res.json('');
    }
})
router.post("/teacher-of-the-class", async (req, res) => {
    try {
        const { user_type_id } = req.decoded
        const { class_id } = req.body

        if (user_type_id != 1) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await User.findOne({
                where: { user_type_id: 2, class_id, status: 1 },
                include: Class
            })
            res.send(data)
        }


    } catch (e) {
        res.status(500);
        console.log(e)
        res.json('');
    }
})

router.post("/students-of-the-class", async (req, res) => {
    try {
        const { user_type_id } = req.decoded
        const { class_id } = req.body

        if (user_type_id == 3) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await User.findAll({
                where: { user_type_id: 3, class_id, status: 1 },
                include: Class
            })
            res.send(data)
        }


    } catch (e) {
        res.status(500);
        console.log(e)
        res.json('');
    }
})

module.exports = router;