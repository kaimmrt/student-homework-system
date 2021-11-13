const express = require('express');
const router = express.Router();

// Models
const { Class } = require('../helper/db');


router.post("/send-data", async (req, res) => {
    try {
        const { user_type_id } = req.decoded
        const { class_name } = req.body

        if (user_type_id != 1) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            await Class.create({
                class_name: class_name,
            })


        }

        res.send("")

    } catch (e) {
        res.status(500);
        res.json('');
    }
})

router.post("/class-list", async (req, res) => {
    try {
        const { user_type_id } = req.decoded

        if (user_type_id != 1) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await Class.findAll({
                where: { status: 1 },
            })
            res.send(data)
        }

    } catch (e) {
        res.status(500);
        res.json('');
    }
})

router.post("/class", async (req, res) => {
    try {
        const { user_type_id } = req.decoded
        const { class_id } = req.body

        if (user_type_id != 1) {
            res.json({
                result: false,
                message: 'You are not authorized!!'
            });
        } else {
            const data = await Class.findOne({
                where: { status: 1, class_id },
            })
            res.send(data)
        }

    } catch (e) {
        res.status(500);
        res.json('');
    }
})
module.exports = router;