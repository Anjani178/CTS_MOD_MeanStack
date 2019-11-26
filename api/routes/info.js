const express = require('express')
const jwt = require('jsonwebtoken')
const info = require('../../models/info')

module.exports = function(router){
    function verifyToken(req, res, next) {
        if(!req.headers.authorization) {
          return res.status(401).send('Unauthorized request')
        }
        let token = req.headers.authorization.split(' ')[1]
        if(token === 'null') {
          return res.status(401).send('Unauthorized request')    
        }
        let payload = jwt.verify(token, 'secretKey')
        if(!payload) {
          return res.status(401).send('Unauthorized request')    
        }
        req.userId = payload.subject
        next()
      }

    router.get('/info',function(req,res){
        res.send('Hello there!!!')
    })

     router.post('/info',function(req,res){
    let note = new info(req.body)
    note.save(function(err,note){
        if(err){
            if (err.code == 11000)
                res.json({value:422});
            else
                //return next(err);
                return res.status(400).json(err);
        }
        else{
            let payload = {subject : note._id}
            let token = jwt.sign(payload,'secretKey')
            // res.status(200).json(note);
            res.status(200).json({note,token});
          }
    })

    })
    router.get('/userD',verifyToken,function(req,res){
    let specialEvents = [
        {
          "_id": "1",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo Special",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(specialEvents)
    });

    router.get('/utCompleted',function(req,res){
      info.find({}, (err, docs) => {
        console.log(docs);
        res.json(docs);
    })
  })
}