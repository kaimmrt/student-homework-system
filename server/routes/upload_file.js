const express = require('express');
const upload = require('../helper/upload')
const config = require('../helper/confiig');

const router = express.Router();

// Models


router.post('/set', upload.single("file"), async (req, res) => {
    try {
        res.json({
            path: config.base_url(req.file.path),
            uuid: req.file
        })
    } catch (err) {
        console.log(err)
        res.status(500);
        res.json('');
    }
});


module.exports = router;