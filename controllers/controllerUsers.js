const mongoose = require('mongoose');
const express = require('express');

const app = express();


exports.new = (req, res) => {

    const newUser = {

    };

    User.create(newUser, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 'fail',
                message: 'User could not be created'
            });
        } else {
            res.redirect('/');
        }
    })
}