var express = require('express');
var router = express.Router();

router.get('/test', function(req, res) {
    res.json([
        {bruh: 1,
        lol: "jess"}
    ]);
})

module.exports = router;