var redis = require("redis"),
    fs = require("fs"),
    client = redis.createClient(6379,'54.173.24.13',{});
fs.readFile('loremipsum', function (err, data) { 

    for(var i=0; i<5000000; i++){
        client.set("a"+i,data, redis.print);
    }
});
