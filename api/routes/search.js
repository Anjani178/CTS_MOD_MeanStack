const User = require('../../models/info'); // Import User Model Schema
const express = require('express');

module.exports = (router) => {
    router.post('/search', (req, res) => {
        User.find({$or:[{"technologies": req.body.technologies },{"timeStart":req.body.timeStart}]}, (err, docs) => {
            if(err){
                console.log('error')
            }
            else{
                console.log(docs);
            }
    })
})
router.get('/search', (req, res) => {
    res.send("hello")
})
}
