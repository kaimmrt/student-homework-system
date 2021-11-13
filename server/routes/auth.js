const express = require('express');

const router = express.Router();
// Models
const { User, UserType } = require('../helper/db');

router.post("/me", async (req, res) => {
    try {
        const { user_id } = req.decoded;
        let user = await User.findOne({
            where: { status: 1, user_id },
            include: UserType
        })
        res.json({
            user,
            result: true
        })

    } catch (error) {
        console.log(error)
        res.status(500);
        res.json('');
    }
});

module.exports = router;
