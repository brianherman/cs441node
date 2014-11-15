var express = require('express');
var router = express.Router();
var redis = require("redis"),
    client = redis.createClient(6379,'54.173.24.13',{});
var tick = 0;
/* GET users listing. */
router.get('/push', function(req, res) {
  if(!req.param('key') || !req.param('value') || !req.param('tick'))
      res.send("FAIL");
  client.set(req.param('key')+'$tick',req.param('tic'), redis.print);
  res.send({
    'TYPE': "PUSH"
    'DATA': "SUCCESS"
  });
});
router.get('/time', function(req, res) {
  client.get(req.param('key')+'$'+'tick', function(err, time){
      if(parseInt(req.param('tick')) > parseInt(time)){
        client.set(req.param('key')+'$'+'tick');
        res.send({
          'TIME': time
          'OP', 'PUSH'
        });

      }else{
        res.send({
          'TIME': req.param('tick'),
          'OP', 'PULL'
        });
      }
    });
});
router.get('/pull', function(req, res) {
  client.get(req.param('key'), function(err,doc){
        if(err){console.log('Key Does not exist');}
        res.send({
            'TYPE': "GET"
            'DATA':doc.toString(),
        });
     });
  });
}
});
module.exports = router;
