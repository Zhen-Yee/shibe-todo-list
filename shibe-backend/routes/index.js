var express = require('express');
var router = express.Router();

router.get('/test', function(req, res) {
    res.json([
        {bruh: "this is a test",
        lol: "test"}
    ]);
})

module.exports = router;