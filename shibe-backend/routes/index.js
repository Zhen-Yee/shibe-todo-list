var express = require('express');
var router = express.Router();
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

router.get('/test', function(req, res) {
    res.json([
        {bruh: "this is a test",
        lol: "test"}
    ]);
})



module.exports = router;