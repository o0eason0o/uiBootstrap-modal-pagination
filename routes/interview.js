var router = require('express').Router();
var mongodb = require('mongodb').MongoClient.connect('mongodb://localhost/l2');
var _ = require('lodash');
//var moment = require('moment')

router.get('/', function(req, res, next){
    var orderBy = req.params.order || "Date";
    mongodb.then(function(db){
        return db.collection('interview').find().toArray();
    })
    //.then(function(interviews){
    //    return _.sortBy(interviews, function(interview){
    //        return moment( interview[orderBy], 'MM/DD/YYYY' );
    //    });
    //    return interview;
    //})
    .then(res.json.bind(res)).catch(next);
})

module.exports = router;
