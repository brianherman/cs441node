var express = require('express');
var router = express.Router();
var redis = require("redis"),
    client = redis.createClient(6379,'54.173.24.13',{});

/* GET users listing. */
router.get('/push', function(req, res) {
  if(!req.param('key') || !req.param('value') || !req.param('tick'))
      res.send("FAIL");
  var p = client.get(req.param('key')+'$tick', function(err, tick) {
    var tic = parseInt(req.param('tick'));
        if(err){console.log('Key Does not exist');}
        if(req.param('tick') < tic){
           client.get(req.param('key'), function(err, doc) {
            res.send({
                'time': tic,
                'data': doc
                });
            return;
           });
        }
    });

  client.set(req.param('key'),req.param('value'), redis.print);
  tic++;
  client.set(req.param('key')+'$tick',req.param('tic'), redis.print);
  res.send({
    'time': tic
  });
});

router.get('/pull', function(req, res) {
  if(!req.param('tick')){
      res.send({'message':"FAIL"});
    }else{
  client.get(req.param('key'), function(err, doc) {
     client.get(req.param('key')+'$tick', function(err, tick) {
        if(err){console.log('Key Does not exist');}
        res.send({
            'data':doc.toString(),
            'time': tick
        });
     });
  });
}
});
module.exports = router;
