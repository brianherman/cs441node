var redis = require("redis"),
    fs = require("fs"),
    client = redis.createClient(6379,'54.173.24.13',{});
        client.get("1",function(err,data){console.log(data)});
