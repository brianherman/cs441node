var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var redis = require("redis"),
client = redis.createClient(6379,'54.173.24.13',{});
router.get('/push', function(req, res,next) {
  var response = {};
  if(!req.param('key') || !req.param('value')){
    res.send({'message': 'fail'}); 
  }else{
  client.set(req.param('key'),req.param('value'), redis.print);
  res.send({
    'type': "push",
    'data': "success",
  });
  }
});
router.get('/getTurn', function(req, res,next) {
  if(!req.param('key') || !req.param('uuid')){
    res.send({'message': 'fail'}); 
  }else{
    client.get(req.param('key')+"turn", function(err,doc){
        console.log("doc" + doc);
        var uid = req.param('uuid');
        console.log(uid == doc);
        if(uid === doc){
            res.send({'turn': 'true'});
        }else{
            res.send({'turn':'false'});
        }
    });
  }
});
router.get('/requestTurn', function(req, res,next) {
  var uid = req.param('uuid');
  client.set(req.param('key')+"turn", uid);
  res.send({"uuid":uid});
});
router.get('/pull', function(req, res,next) {
    client.get(req.param('key'), function(err,doc){
      if(err){console.log('key does not exist');}
      if(doc === null){
          return;
      }
      res.send({
        'type': "get",
        'doc':doc.toString()
      });
  });
});
router.get('/uuid', function(req, res,next) {
    var uid = uuid.v1();
    client.set(req.param('key')+"turn", uid);
    res.send({'uuid':uid});
//    if(!req.param('key')){
//    console.log("key");
//    client.get(req.param('key')+"turn", function(err,turn){
 //       if(err){ res.send("error");}
    //    if(turn === null || turn === ""){
   //     }
   //   });
//    }
    });
module.exports = router;
