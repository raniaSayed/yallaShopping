var express = require('express');
var server = express();
var nodemailer = require('nodemailer');

//connect to db and setup auto-increment
var mongoose = require("mongoose");
var connection = mongoose.createConnection("mongodb://localhost/souq");
var mongooseTextSearch = require("mongoose-text-search");
autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
mongoose.connect("mongodb://localhost/souq");

// node mailer setup
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'eshtry.iti38@gmail.com',
        pass: "iti38123456789"
    }
});

module.exports = {
    jwtSecret: "TNuYmaWm6kIGOU7dz4Zce97X6mIpbLigetAiBVOjHUFnFTSOQmlqPkkFVNzY4eF",
    transporter,
};
